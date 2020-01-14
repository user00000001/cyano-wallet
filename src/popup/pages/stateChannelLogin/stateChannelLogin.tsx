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
import { dummy, reduxConnect, withProps } from '../../compose';
import { Actions } from '../../redux';
import { Props, StateChannelLoginView } from './stateChannelLoginView';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            resolveRequest: Actions.transactionRequests.resolveRequest,
        },
        dispatch,
    );

const enhancer = (Component: React.ComponentType<Props>) => (props: RouteComponentProps<any>) =>
    reduxConnect(dummy, mapDispatchToProps, (reduxProps, actions) =>
        withProps(
            {
                handleCancel: async () => {
                    props.history.goBack();

                    const requestId: string = get(props.location, 'state.requestId');
                    await actions.resolveRequest(requestId, 'CANCELED');
                },
                handleConfirm: async () => {
                    const requestId: string = get(props.location, 'state.requestId');

                    props.history.push('/confirm', { requestId, redirectSucess: '/dashboard', redirectFail: '/dashboard' });
                },
                locked: get(props.location, 'state.locked', false)
            },
            (injectedProps) => <Component {...injectedProps} />,
        ),
    );

export const StateChannelLogin = enhancer(StateChannelLoginView);
