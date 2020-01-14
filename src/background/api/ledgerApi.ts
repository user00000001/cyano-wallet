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
import * as Ledger from '@ont-community/ontology-ts-sdk-ledger';
import { Account, TWallet } from 'tesrasdk-ts';
import { v4 as uuid } from 'uuid';
import { getWallet } from '../../api/authApi';

export async function isLedgerSupported() {
  return await Ledger.isLedgerSupported();
}

export async function importLedgerKey(index: number, neo: boolean, wallet: string | TWallet | null) {
  if (wallet === null) {
    wallet = TWallet.create(uuid());
  } else if (typeof wallet === 'string') {
    wallet = getWallet(wallet);
  }

  const scrypt = wallet.scrypt;
  const scryptParams = {
    blockSize: scrypt.r,
    cost: scrypt.n,
    parallel: scrypt.p,
    size: scrypt.dkLen,
  };

  const privateKey = await Ledger.create(index, neo);

  const account = Account.create(privateKey, '', uuid(), scryptParams);

  wallet.addAccount(account);
  wallet.setDefaultAccount(account.address.toBase58());

  return {
    wallet: wallet.toJson(),
  };
}
