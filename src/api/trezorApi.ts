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
// import * as Trezor from '@ont-community/ontology-ts-sdk-trezor';
import { get } from 'lodash';
import { TWallet } from 'tesrasdk-ts';
import { getAccount } from './accountApi';

export async function isTrezorSupported() {
  return false;
  // return await Trezor.isTrezorSupported();
}

export async function importTrezorKey(index: number): Promise<{ wallet: string }> {
  throw new Error('Unsupported');
  // const wallet = TWallet.create(uuid());
  // const scrypt = wallet.scrypt;
  // const scryptParams = {
  //   blockSize: scrypt.r,
  //   cost: scrypt.n,
  //   parallel: scrypt.p,
  //   size: scrypt.dkLen,
  // };

  // const privateKey = await Trezor.create(index);
  // const publicKey = privateKey.getPublicKey();

  // const identity = Identity.create(privateKey, '', uuid(), scryptParams);
  // const tstId = identity.tstId;

  // register the TST ID on blockchain
  // if (register) {
  //   const tx = TstidContract.buildRegisterTstidTx(tstId, publicKey, '0', '30000');
  //   tx.payer = identity.controls[0].address;

  //   await TransactionBuilder.signTransactionAsync(tx, privateKey);

  //   const protocol = ssl ? 'wss' : 'ws';
  //   const client = new WebsocketClient(`${protocol}://${nodeAddress}:${CONST.HTTP_WS_PORT}`, true);
  //   await client.sendRawTransaction(tx.serialize(), false, true);
  // }

  // const account = Account.create(privateKey, '', uuid(), scryptParams);

  // wallet.addIdentity(identity);
  // wallet.addAccount(account);
  // wallet.setDefaultIdentity(identity.tstid);
  // wallet.setDefaultAccount(account.address.toBase58());

  // return {
  //   wallet: wallet.toJson(),
  // };
}

export function isTrezorKey(wallet: TWallet) {
  return get(getAccount(wallet).encryptedKey, 'type') === 'TREZOR';
}
