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
import { RuntimeState, SET_BALANCE, SET_TRANSFERS } from '../../redux/runtime';

const defaultState: RuntimeState = { tsgAmount: 0, tstAmount: 0, unboundAmount: 0, nepAmount: 0, transfers: [], tokenAmounts: [] };

export const runtimeReducer: Reducer<RuntimeState> = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BALANCE:
      return { ...state, tsgAmount: action.tsgAmount, tstAmount: action.tstAmount, unboundAmount: action.unboundAmount, nepAmount: action.nepAmount, tokenAmounts: action.tokenAmounts };
    case SET_TRANSFERS:
      return { ...state, transfers: action.transfers };
    default:
      return state;
  }
};
