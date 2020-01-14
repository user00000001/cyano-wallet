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
import { Parameter, VmType } from '@ont-dev/ontology-dapi';
import { AssetType } from './runtime';

export type ErrorCode = 'TIMEOUT' | 'WRTSG_PASSWORD' | 'CANCELED' | 'OTHER';

export type TransactionType =
  | 'transfer'
  | 'withdraw_tsg'
  | 'swap'
  | 'register_tst_id'
  | 'sc_call'
  | 'sc_call_read'
  | 'sc_deploy'
  | 'message_sign'
  | 'stateChannel_login';

export interface TransactionRequest {
  id: string;
  type: TransactionType;
  resolved?: boolean;
  error?: ErrorCode;
  result?: any;
}

export interface TransferRequest extends TransactionRequest {
  sender: string;
  recipient: string;
  amount: number;
  asset: AssetType;
}

export interface WithdrawTsgRequest extends TransactionRequest {
  amount: number;
}

export interface SwapRequest extends TransactionRequest {
  amount: number;
}

export interface MessageSignRequest extends TransactionRequest {
  message: string;
}

// tslint:disable-next-line:no-empty-interface
export interface StateChannelLoginRequest extends TransactionRequest {

}

export interface RegisterTstIdRequest extends TransactionRequest {
  identity: string;
  encryptedWif: string;
  mnemonics: string;
  wif: string;
  password: string;
}

export interface ScCallRequest extends TransactionRequest {
    isWasmVm: boolean;
  contract: string;
  method: string;
  gasPrice?: number;
  gasLimit?: number;
  requireIdentity?: boolean;
  parameters?: Parameter[];
  paramsHash?: string;
  presignedTransaction?: string;
}

export interface ScDeployRequest extends TransactionRequest {
  code: string;
  name?: string;
  version?: string;
  author?: string;
  email?: string;
  description?: string;
  vmType: boolean | VmType;
  gasPrice?: number;
  gasLimit?: number;
}

export interface ScCallReadRequest extends TransactionRequest {
    isWasmVm: boolean;
  contract: string;
  method: string;
  parameters?: Parameter[];
}

export interface TransactionRequestsState {
  requests: TransactionRequest[];
}

export const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST';

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const RESOLVE_TRANSACTION_REQUEST = 'RESOLVE_TRANSACTION_REQUEST';
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';

export const addRequest = <T extends TransactionRequest>(request: T) => ({
  request,
  type: ADD_TRANSACTION_REQUEST,
});

export const updateRequest = <T extends TransactionRequest>(id: string, request: Partial<T>) => ({
  id,
  request,
  type: UPDATE_REQUEST,
});

export const resolveRequest = (id: string, error?: ErrorCode, result?: any) => ({
  error,
  id,
  result,
  type: RESOLVE_TRANSACTION_REQUEST,
});

export const submitRequest = (id: string, password?: string) => ({
  id,
  password,
  type: SUBMIT_REQUEST,
});

export function isScCallRequest(request: TransactionRequest): request is ScCallRequest {
  return request.type === 'sc_call';
}