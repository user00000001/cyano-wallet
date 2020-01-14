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
import { dummy, reduxConnect, withProps } from '../../compose';
import { GlobalState } from '../../redux';
import { Props, TokenSettingsView } from './tokenSettingsView';

const mapStateToProps = (state: GlobalState) => ({
  tokens: state.settings.tokens,
});

const enhancer = (Component: React.ComponentType<Props>) => (props: RouterProps) =>
  reduxConnect(mapStateToProps, dummy, (reduxProps) =>
    withProps(
      {
        handleAdd: () => {
          props.history.push('/settings/token/add');
        },
        handleBack: () => {
          props.history.replace('/settings');
        },
        handleDel: (contract: string) => {
          props.history.push('/settings/token/del', { contract });
        },
      },
      (injectedProps) => <Component {...injectedProps} tokens={reduxProps.tokens} />,
    ),
  );

export const TokenSettings = enhancer(TokenSettingsView);
