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
import axios from 'axios';
import { flatMap, get, orderBy } from 'lodash';
import { AssetType, Transfer } from '../../redux/runtime';
import { getExplorerAddress } from '../network';

export async function getTransferList(address: string) {
  const explorerAddress = getExplorerAddress();
  if (explorerAddress === null) {
    return [];
  }
  
  const url = `https://${explorerAddress}/api/v1/explorer/address/${address}/100/1`;

  const response = await axios.get(url);

  const txnList: any[] = get(response.data, 'Result.TxnList', []);

  const transfers = flatMap(
    txnList.map(tx => {
      const txnTime: number = get(tx, 'TxnTime', 0);
      const transferList: any[] = get(tx, 'TransferList', []);

      return transferList.map(transfer => ({
        amount: get(transfer, 'Amount', '0'),
        asset: translateAsset(get(transfer, 'AssetName')),
        from: get(transfer, 'FromAddress'),
        time: txnTime,
        to: get(transfer, 'ToAddress')
      }) as Transfer);
    })
  );

  return orderBy(transfers, 'time', 'desc');
}

function translateAsset(asset: any): AssetType {
  if (asset === 'tst') {
    return 'TST';
  } else if (asset === 'tsg') {
    return 'TSG';
  } else {
    return 'TST';
  }
}