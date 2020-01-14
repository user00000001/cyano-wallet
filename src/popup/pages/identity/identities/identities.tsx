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
import * as React from 'react';
import { RouterProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { encodeWallet, getWallet } from 'src/api/authApi';
import { reduxConnect, withProps } from '../../../compose';
import { Actions, GlobalState } from '../../../redux';
import { IdentitiesView, Props } from './identitiesView';

const mapStateToProps = (state: GlobalState) => ({
  loading: state.loader.loading,
  transfers: state.runtime.transfers,
  wallet: state.wallet.wallet,
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
  reduxConnect(mapStateToProps, mapDispatchToProps, (reduxProps, actions) => {
    const wallet = getWallet(reduxProps.wallet!);
    const identities = wallet.identities.map((identity) => identity.tstId);

    return withProps(
      {
        handleAdd: () => {
          props.history.push('/identity/add');
        },
        handleBack: () => {
          props.history.push('/identity');
        },
        handleIdentityClick: async (identity: string) => {
          wallet.setDefaultIdentity(identity);
          const encodedWallet = encodeWallet(wallet);

          await actions.startLoading();
          await actions.setWallet(encodedWallet);

          await actions.finishLoading();

          props.history.push('/identity');
        },
        handleIdentityDelClick: (identity: string) => {
          props.history.push('/identity/del', { identity });
        },
        identities,
        loading: reduxProps.loading,
        selectedIdentity: wallet.defaultTstid,
      },
      (injectedProps) => <Component {...injectedProps} />,
    );
  });

export const Identities = enhancer(IdentitiesView);
