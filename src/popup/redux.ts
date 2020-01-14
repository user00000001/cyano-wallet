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

import { Store } from 'react-chrome-redux';
import { GlobalState, GlobalStore } from '../redux/state';

export { GlobalState } from '../redux/state';
export { default as Actions } from '../redux/actions';

let store: GlobalStore;

export function initStore(): GlobalStore {
    store = new Store<GlobalState>({
        portName: 'TST_EXTENSION' // communication port name
    });
    
    return store;
}
