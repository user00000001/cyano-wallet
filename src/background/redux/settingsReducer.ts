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
import { Reducer } from 'redux';
import {
  ADD_TOKEN,
  ADD_TRUSTED_SC,
  DEL_TOKEN,
  DEL_TRUSTED_SC,
  SET_SETTINGS,
  SettingsState,
} from '../../redux/settings';

const defaultState: SettingsState = { address: '121.41.17.61:25771', ssl: false, net: 'MAIN', tokens: [], trustedScs: [] };
// const defaultState: SettingsState = { address: 'dapp1.tesra.me', ssl: false, net: 'MAIN', tokens: [], trustedScs: [] };
export const settingsReducer: Reducer<SettingsState> = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        address: action.address,
        net: action.net,
        ssl: action.ssl,
        tokens: action.tokens,
        trustedScs: action.trustedScs,
      };
    case ADD_TOKEN:
      return {
        ...state,
        tokens: [
          ...state.tokens.filter((token) => token.contract !== action.contract),
          {
            contract: action.contract,
            decimals: action.decimals,
            name: action.name,
            specification: action.specification,
            symbol: action.symbol,
          },
        ],
      };
    case ADD_TRUSTED_SC:
      return {
        ...state,
        trustedScs: [
          ...state.trustedScs.filter((sc) => sc.name !== action.name),
          {
            confirm: action.confirm,
            contract: action.contract,
            method: action.method,
            name: action.name,
            paramsHash: action.paramsHash,
            password: action.password,
          },
        ],
      };
    case DEL_TOKEN:
      return {
        ...state,
        tokens: state.tokens.filter((token) => token.contract !== action.contract),
      };
    case DEL_TRUSTED_SC:
      return {
        ...state,
        trustedScs: state.trustedScs.filter((sc) => sc.name !== action.name),
      };
    default:
      return state;
  }
};
