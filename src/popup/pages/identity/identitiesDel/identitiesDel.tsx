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
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { identityDelete } from 'src/api/identityApi';
import { GlobalState } from 'src/redux/state';
import { reduxConnect, withProps } from '../../../compose';
import { Actions } from '../../../redux';
import { IdentitiesDelView, Props } from './identitiesDelView';

const mapStateToProps = (state: GlobalState) => ({
  loading: state.loader.loading,
  wallet: state.wallet.wallet,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      delToken: Actions.settings.delToken,
      finishLoading: Actions.loader.finishLoading,
      setWallet: Actions.wallet.setWallet,
      startLoading: Actions.loader.startLoading,
    },
    dispatch,
  );

const enhancer = (Component: React.ComponentType<Props>) => (props: RouteComponentProps<any>) =>
  reduxConnect(mapStateToProps, mapDispatchToProps, (reduxProps, actions) => {
    const identity: string = get(props.location, 'state.identity');

    return withProps(
      {
        handleCancel: async () => {
          props.history.goBack();
        },
        handleConfirm: async () => {
          await actions.startLoading();

          if (reduxProps.wallet != null) {
            const { wallet } = identityDelete(identity, reduxProps.wallet);
            await actions.setWallet(wallet);
          }
          await actions.finishLoading();

          props.history.push('/identity/change');
        },
        identity,
        loading: reduxProps.loading,
      },
      (injectedProps) => <Component {...injectedProps} />,
    );
  });

export const IdentitiesDel = enhancer(IdentitiesDelView);
