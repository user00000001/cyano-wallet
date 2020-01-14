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

export interface WalletState {
  wallet: string | null;
};

export const SET_WALLET = 'SET_WALLET';
export const CLEAR_WALLET = 'CLEAR_WALLET';

export const CLEAR_IDENTITY = 'CLEAR_IDENTITY';

export const setWallet = (walletEncoded: string) => ({ type: SET_WALLET, wallet: walletEncoded });
export const clearWallet = () => ({ type: CLEAR_WALLET });

export const clearIdentity = () => ({ type: CLEAR_IDENTITY });
