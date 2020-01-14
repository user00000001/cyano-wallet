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
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { RouterProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { OEP4TokenAmount } from 'src/api/tokenApi';
import { TokenAmountState } from 'src/redux/runtime';
import { TokenState } from 'src/redux/settings';
import { v4 as uuid } from 'uuid';
import { getAddress } from '../../../api/accountApi';
import { SwapRequest, TransferRequest, WithdrawTsgRequest } from '../../../redux/transactionRequests';
import { reduxConnect, withProps } from '../../compose';
import { Actions, GlobalState } from '../../redux';
import { convertAmountToBN, convertAmountToStr, decodeAmount } from '../../utils/number';
import { DashboardView, Props } from './dashboardView';

const mapStateToProps = (state: GlobalState) => ({
  nepAmount: state.runtime.nepAmount,
  tokenAmounts: state.runtime.tokenAmounts,
  tokens: state.settings.tokens,
  transfers: state.runtime.transfers,
  tsgAmount: state.runtime.tsgAmount,
  tstAmount: state.runtime.tstAmount,
  unboundAmount: state.runtime.unboundAmount,
  walletEncoded: state.wallet.wallet,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addRequest: Actions.transactionRequests.addRequest,
    },
    dispatch,
  );

const enhancer = (Component: React.ComponentType<Props>) => (props: RouterProps) =>
  reduxConnect(mapStateToProps, mapDispatchToProps, (reduxProps, actions) =>
    withProps(
      {
        handleReceive: () => {
          props.history.push('/receive');
        },
        handleSend: async () => {
          const requestId = uuid();
          // todo: no type check TransferRequest
          await actions.addRequest({
            amount: 0,
            asset: 'TST',
            id: requestId,
            recipient: '',
            type: 'transfer',
          } as TransferRequest);

          props.history.push('/send', { requestId });
        },
        handleSwap: async () => {
          if (convertAmountToBN(reduxProps.nepAmount, 'NEP').gte(new BigNumber('1.0'))) {
            const requestId = uuid();
            // todo: no type check SwapRequest
            await actions.addRequest({
              amount: reduxProps.nepAmount,
              id: requestId,
              type: 'swap',
            } as SwapRequest);

            props.history.push('/swap', { requestId });
          }
        },
        handleTransfers: () => {
          props.history.push('/transfers');
        },
        handleWithdraw: async () => {
          if (reduxProps.unboundAmount > 0) {
            const requestId = uuid();
            // todo: no type check TransferRequest
            await actions.addRequest({
              amount: reduxProps.unboundAmount,
              id: requestId,
              type: 'withdraw_tsg',
            } as WithdrawTsgRequest);

            props.history.push('/confirm', { requestId, redirectSucess: '/sendComplete', redirectFail: '/sendFailed' });
          }
        },
        nepAmount: convertAmountToStr(reduxProps.nepAmount, 'NEP'),
        ownAddress: getAddress(reduxProps.walletEncoded!),
        tokens: prepareTokenAmounts(reduxProps.tokens, reduxProps.tokenAmounts),
        tsgAmount: convertAmountToStr(reduxProps.tsgAmount, 'TSG'),
        tstAmount: convertAmountToStr(reduxProps.tstAmount, 'TST'),
        unboundAmount: convertAmountToStr(reduxProps.unboundAmount, 'TSG'),
      },
      (injectedProps) => <Component {...injectedProps} />,
    ),
  );

function prepareTokenAmounts(tokens: TokenState[] = [], items: TokenAmountState[] = []): OEP4TokenAmount[] {
  return items.map((item) => {
    const contract = item.contract;
    const token = tokens.find((t) => t.contract === contract)!;

    const amount = decodeAmount(item.amount, token.decimals);

    return {
      amount,
      decimals: token.decimals,
      name: token.name,
      symbol: token.symbol,
    };
  });
}

export const Dashboard = enhancer(DashboardView);
