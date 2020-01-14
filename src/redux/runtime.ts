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

export type AssetType = 'TST' | 'TSG' | string;

export interface Transfer {
  amount: string;
  asset: AssetType;
  from: string;
  to: string;
  time: number;
}

export interface TokenAmountState {
  contract: string;
  amount: string;
}

export interface RuntimeState {
  tsgAmount: number;
  tstAmount: number;
  nepAmount: number;

  unboundAmount: number;
  transfers: Transfer[];

  tokenAmounts: TokenAmountState[];
};

export const SET_BALANCE = 'SET_BALANCE';
export const SET_TRANSFERS = 'SET_TRANSFERS';

export const setBalance = (tsgAmount: number, tstAmount: number, unboundAmount: number, nepAmount: number, tokenAmounts: TokenAmountState[]) => ({ type: SET_BALANCE, tsgAmount, tstAmount, unboundAmount, nepAmount, tokenAmounts });

export const setTransfers = (transfers: Transfer[]) => ({ type: SET_TRANSFERS, transfers });
