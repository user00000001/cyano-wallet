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
import { get } from 'lodash';
import * as React from 'react';
import { RouterProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { importTrezorKey } from '../../../../api/trezorApi';
import { reduxConnect, withProps } from '../../../compose';
import { Actions, GlobalState } from '../../../redux';
import { Props, TrezorImportView } from './trezorImportView';

const mapStateToProps = (state: GlobalState) => ({
  loading: state.loader.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ 
  finishLoading: Actions.loader.finishLoading,
  setWallet: Actions.wallet.setWallet,
  startLoading: Actions.loader.startLoading
}, dispatch);

const enhancer = (Component: React.ComponentType<Props>) => (props: RouterProps) => (
  reduxConnect(mapStateToProps, mapDispatchToProps, (reduxProps, actions) => (
    withProps({
      handleCancel: () => {
        props.history.goBack();
      },
      handleSubmit: async (values: object) => {
        const index = get(values, 'index', '');
  
        await actions.startLoading();
  
        const { wallet } = await importTrezorKey(Number(index));
        await actions.setWallet(wallet);
  
        await actions.finishLoading();
  
        props.history.push('/dashboard');
      },    
    }, (injectedProps) => (
      <Component {...injectedProps} loading={reduxProps.loading} />
    ))
  ))
)

export const TrezorImport = enhancer(TrezorImportView);
