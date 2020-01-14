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
import { get } from 'lodash';
import {
  CONST,
  Crypto,
  Identity,
  TransactionBuilder,
  TstAssetTxBuilder,
  TstidContract,
  TxSignature,
} from 'tesrasdk-ts';
import { decryptAccount, getAccount } from '../../api/accountApi';
import { getWallet } from '../../api/authApi';
import { decryptIdentity } from '../../api/identityApi';
import { RegisterTstIdRequest, TransferRequest, WithdrawTsgRequest } from '../../redux/transactionRequests';
import Address = Crypto.Address;
import { getClient } from '../network';
import { getStore } from '../redux';

export async function getBalance() {
  const state = getStore().getState();
  const address = getAccount(state.wallet.wallet!).address;

  const client = getClient();
  const response = await client.getBalance(address);
  const tst: number = Number(get(response, 'Result.tst'));
  const tsg: number = Number(get(response, 'Result.tsg'));

  return {
    tsg,
    tst,
  };
}

export async function getUnboundTsg() {
  const state = getStore().getState();
  const address = getAccount(state.wallet.wallet!).address;

  const client = getClient();
  const response = await client.getUnboundtsg(address);
  const unboundTsg = Number(get(response, 'Result'));
  return unboundTsg;
}

export async function transfer(request: TransferRequest, password: string) {
  const state = getStore().getState();
  const wallet = getWallet(state.wallet.wallet!);

  const from = getAccount(state.wallet.wallet!).address;
  const privateKey = decryptAccount(wallet, password);

  const to = new Address(request.recipient);
  const amount = String(request.amount);

  const tx = TstAssetTxBuilder.makeTransferTx(request.asset, from, to, amount, '500', `${CONST.DEFAULT_GAS_LIMIT}`);

  await TransactionBuilder.signTransactionAsync(tx, privateKey);

  const client = getClient();
  return await client.sendRawTransaction(tx.serialize(), false, true);
}

export async function withdrawTsg(request: WithdrawTsgRequest, password: string) {
  const state = getStore().getState();
  const wallet = getWallet(state.wallet.wallet!);

  const from = getAccount(state.wallet.wallet!).address;
  const privateKey = decryptAccount(wallet, password);

  const amount = String(request.amount);

  const tx = TstAssetTxBuilder.makeWithdrawTsgTx(from, from, amount, from, '500', `${CONST.DEFAULT_GAS_LIMIT}`);
  await TransactionBuilder.signTransactionAsync(tx, privateKey);

  const client = getClient();
  await client.sendRawTransaction(tx.serialize(), false, true);
}

export async function registerTstId(request: RegisterTstIdRequest, password: string) {
  // const accountPassword: string = request.password;
  const accountPassword: string = password;
  const identityEncoded: string = request.identity;
  const identity = Identity.parseJson(identityEncoded);

  const state = getStore().getState();
  const wallet = getWallet(state.wallet.wallet!);

  const from = getAccount(state.wallet.wallet!).address;
  const accountPrivateKey = decryptAccount(wallet, accountPassword);
  const identityPrivateKey = decryptIdentity(identity, request.password, wallet.scrypt);

  const identityPublicKey = identityPrivateKey.getPublicKey();

  const tx = TstidContract.buildRegisterTstidTx(identity.tstId, identityPublicKey, '500', `${CONST.DEFAULT_GAS_LIMIT}`);

  tx.payer = from;
  await TransactionBuilder.signTransactionAsync(tx, accountPrivateKey);

  // signs by identity private key
  const signature = await TxSignature.createAsync(tx, identityPrivateKey);
  tx.sigs.push(signature);

  const client = getClient();
  await client.sendRawTransaction(tx.serialize(), false, true);
}

export async function checkTstId(identity: Identity, password: string) {
  const tstId = identity.tstId;

  const tx = TstidContract.buildGetDDOTx(tstId);

  const client = getClient();
  const result = await client.sendRawTransaction(tx.serialize(), true, false);

  if (result.Result.Result === '') {
    return false;
  }

  // fixme: get DDO and check if public key of the identity is pressent
  return true;
}
