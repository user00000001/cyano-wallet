/*
 * Copyright (C) 2019-2020 user00000001
 * This file is part of The TesraSupernet TWallet&ID.
 *
 * The The TesraSupernet TWallet&ID is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The TesraSupernet TWallet&ID is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The TesraSupernet TWallet&ID.  If not, see <http://www.gnu.org/licenses/>.
 */
import { timeout, TimeoutError } from 'promise-timeout';
import { Dispatch, Reducer } from 'redux';
import { Identity } from 'tesrasdk-ts';
import { getWallet } from '../../api/authApi';
import Actions from '../../redux/actions';
import { GlobalState } from '../../redux/state';
import {
  ADD_TRANSACTION_REQUEST,
  MessageSignRequest,
  RegisterTstIdRequest,
  RESOLVE_TRANSACTION_REQUEST,
  ScCallReadRequest,
  ScCallRequest,
  ScDeployRequest,
  StateChannelLoginRequest,
  SUBMIT_REQUEST,
  SwapRequest,
  TransactionRequestsState,
  TransferRequest,
  UPDATE_REQUEST,
  WithdrawTsgRequest,
} from '../../redux/transactionRequests';
import { messageSign } from '../api/messageApi';
import { swapNep } from '../api/neoApi';
import { registerTstId, transfer, withdrawTsg } from '../api/runtimeApi';
import { scCall, scCallRead, scDeploy } from '../api/smartContractApi';
import { stateChannelLogin } from '../api/stateChannelApi';
import { transferToken } from '../api/tokenApi';

const defaultState: TransactionRequestsState = { requests: [] };

export const transactionRequestsReducer: Reducer<TransactionRequestsState> = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_REQUEST:
      return { ...state, requests: [...state.requests, action.request] };
    case RESOLVE_TRANSACTION_REQUEST:
      return {
        ...state,
        requests: [
          ...state.requests.filter((r) => r.id !== action.id),
          {
            ...state.requests.find((r) => r.id === action.id),
            error: action.error,
            resolved: true,
            result: action.result,
          },
        ],
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        requests: [
          ...state.requests.filter((r) => r.id !== action.id),
          {
            ...state.requests.find((r) => r.id === action.id),
            ...action.request,
          },
        ],
      };
    default:
      return state;
  }
};

export const transactionRequestsAliases = {
  [SUBMIT_REQUEST]: (action: any) => {
    return async (dispatch: Dispatch, getState: () => GlobalState) => {
      const requestId: string = action.id;
      const password: string | undefined = action.password;

      const state = getState();
      const requests = state.transactionRequests.requests;
      const request = requests.find((r) => r.id === requestId);

      if (request === undefined) {
        throw new Error('Request already submited');
      }

      let result: any;
      try {
        switch (request.type) {
          case 'transfer':
            result = await submitTransfer(request as TransferRequest, password!);
            break;
          case 'withdraw_tsg':
            result = await submitWithdrawTsg(request as WithdrawTsgRequest, password!);
            break;
          case 'swap':
            result = await submitSwap(request as SwapRequest, password!);
            break;
          case 'register_tst_id':
            result = await submitRegisterTstId(request as RegisterTstIdRequest, password!, dispatch, state);
            break;
          case 'sc_call':
            result = await submitScCall(request as ScCallRequest, password!, dispatch, state);
            if (result === undefined) {
              return;
            } 
            break;
          case 'sc_call_read':
            result = await submitScCallRead(request as ScCallReadRequest);
            break;
          case 'sc_deploy':
            result = await submitScDeploy(request as ScDeployRequest, password!);
            break;
          case 'message_sign':
            result = await submitMessageSign(request as MessageSignRequest, password!);
            break;
          case 'stateChannel_login':
            result = await submitStateChannelLogin(request as StateChannelLoginRequest, password!);
            break; 
        }

        // resolves request
        dispatch(Actions.transactionRequests.resolveRequest(requestId, undefined, result));
      } catch (e) {
        if (e instanceof TimeoutError) {
          // resolves request
          dispatch(Actions.transactionRequests.resolveRequest(requestId, 'TIMEOUT'));
        } else {
          let msg: string;

          if (e instanceof Error) {
            msg = e.message;
          } else {
            msg = e;
          }
          // resolves request
          dispatch(Actions.transactionRequests.resolveRequest(requestId, 'OTHER', msg));
          // tslint:disable-next-line:no-console
          console.error('Error during submiting transaction', e);
        }
      }
    };
  },
};

async function submitTransfer(request: TransferRequest, password: string) {
  let response: any;

  if (request.asset === 'TST' || request.asset === 'TSG') {
    response = await timeout(transfer(request, password), 15000);
  } else {
    response = await timeout(transferToken(request, password), 15000);
  }

  if (response.Result.State === 0) {
    throw new Error('OTHER');
  }

  return response.Result.TxHash;
}

function submitWithdrawTsg(request: WithdrawTsgRequest, password: string) {
  return timeout(withdrawTsg(request, password), 15000);
}

function submitSwap(request: SwapRequest, password: string) {
  return timeout(swapNep(request, password), 15000);
}

async function submitRegisterTstId(
  request: RegisterTstIdRequest,
  password: string,
  dispatch: Dispatch,
  state: GlobalState,
) {
  await timeout(registerTstId(request, password), 15000);

  // stores identity in wallet
  const identity = Identity.parseJson(request.identity);
  const wallet = getWallet(state.wallet.wallet!);
  wallet.addIdentity(identity);
  wallet.setDefaultIdentity(identity.tstId);

  await dispatch(Actions.wallet.setWallet(wallet.toJson()));
}

function isTrustedSc(request: ScCallRequest, state: GlobalState) {
  if (request.requireIdentity) {
    return false;
  }

  const trustedScs = state.settings.trustedScs;

  const trustedSc = trustedScs.find(
    (t) =>
      t.contract === request.contract &&
      (t.method === undefined || t.method === request.method) &&
      (t.paramsHash === undefined || t.paramsHash === request.paramsHash),
  );

  if (trustedSc !== undefined) {
    if (trustedSc.password === false) {
      return true;
    }
  }

  return false;
}

async function submitScCall(request: ScCallRequest, password: string, dispatch: Dispatch, state: GlobalState) {
  if (isTrustedSc(request, state)) {
    // fixme: add support for account+identity password
    await dispatch(Actions.password.setPassword(password));
  }

  const response = await timeout(scCall(request, password), 15000);

  if (typeof response === 'string') {
    dispatch(Actions.transactionRequests.updateRequest<ScCallRequest>(request.id, { presignedTransaction: response }));
    return undefined;
  } else {
    // Fixme: Log message cause Notify message to disappear
    if (response.Action === 'Log') {
      return {
        transaction: response.Result.TxHash,
      };
    }

    if (response.Result.State === 0) {
      throw new Error('OTHER');
    }
  
    const notify = response.Result.Notify.filter((element: any) => element.ContractAddress === request.contract).map(
      (element: any) => element.States,
    );
    return {
      // Fixme: The Response of smartContract.invoke is {results: Result[], transaction: string} https://github.com/TesraSupernet/tesra-dapi/blob/master/src/api/types.ts
      results: notify,
      transaction: response.Result.TxHash,
    };
  }


}

async function submitMessageSign(request: MessageSignRequest, password: string) {
  return timeout(messageSign(request, password), 15000);
}

async function submitStateChannelLogin(request: StateChannelLoginRequest, password: string) {
  return timeout(stateChannelLogin(request, password), 15000);
}

async function submitScCallRead(request: ScCallReadRequest) {
  const response = await timeout(scCallRead(request), 15000);

  if (response.Result.State === 0) {
    throw new Error('OTHER');
  }

  return response.Result.Result;
}

function submitScDeploy(request: ScDeployRequest, password: string) {
  return timeout(scDeploy(request, password), 15000);
}
