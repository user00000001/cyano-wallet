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
import * as React from 'react';
import { RouterProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getWallet } from '../../../../api/authApi';
import { identityImportPrivateKey } from '../../../../api/identityApi';
import { getBackgroundManager } from '../../../backgroundManager';
import { reduxConnect, withProps } from '../../../compose';
import { Actions, GlobalState } from '../../../redux';
import { IdentityImportView, Props } from './identityImportView';

const mapStateToProps = (state: GlobalState) => ({
  loading: state.loader.loading,
  walletEncoded: state.wallet.wallet,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      finishLoading: Actions.loader.finishLoading,
      setWallet: Actions.wallet.setWallet,
      startLoading: Actions.loader.startLoading,
    },
    dispatch,
  );

const enhancer = (Component: React.ComponentType<Props>) => (props: RouterProps) =>
  reduxConnect(mapStateToProps, mapDispatchToProps, (reduxProps, actions, getReduxProps) =>
    withProps(
      {
        handleCancel: () => {
          props.history.goBack();
        },
        handleSubmit: async (values: object) => {
          const wallet = getWallet(reduxProps.walletEncoded!);

          const password = get(values, 'password', '');
          const wif = get(values, 'privateKey', '');

          await actions.startLoading();

          try {
            const { identity } = identityImportPrivateKey(wif, password, wallet.scrypt);

            const tstIdExist = await getBackgroundManager().checkTstId(identity.toJson(), password);

            await actions.finishLoading();

            if (tstIdExist) {
              wallet.addIdentity(identity);
              wallet.setDefaultIdentity(identity.tstId);

              await actions.setWallet(wallet.toJson());

              props.history.push('/identity/dashboard');
            } else {
              props.history.push('/identity/checkFailed');
            }
            return {};
          } catch (e) {
            await actions.finishLoading();

            return {
              privateKey: 'Invaid private key',
            };
          }
        },
      },
      (injectedProps) => <Component {...injectedProps} loading={reduxProps.loading} />,
    ),
  );

export const IdentityImport = enhancer(IdentityImportView);
