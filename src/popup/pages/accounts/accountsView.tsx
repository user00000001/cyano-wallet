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
import { Button } from 'semantic-ui-react';
import { AccountLogoHeader, Filler, Spacer, StatusBar, View } from '../../components';
import { AccountList } from '../../components';

export interface Props {
  loading: boolean;
  accounts: string[];
  selectedAccount: string;

  handleAdd: () => void;
  handleBack: () => void;

  handleAccountClick: (account: string) => void;
  handleAccountDelClick: (account: string) => void;
}

export const AccountsView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true}>
    <View orientation="column" className="part gradient">
      <AccountLogoHeader title="Accounts" />
      <View content={true} className="spread-around">
        <View>Select the account to switch to.</View>
      </View>
    </View>
    <View orientation="column" fluid={true} content={true} className="spread-around">
      <View orientation="column" className="scrollView">
        <AccountList
          accounts={props.accounts}
          selectedAccount={props.selectedAccount}
          onClick={props.handleAccountClick}
          onDel={props.handleAccountDelClick}
        />
      </View>
      <Spacer />
      <Filler />
      <View className="buttons">
        <Button icon="add" content="Add" onClick={props.handleAdd} loading={props.loading} disabled={props.loading} />
        <Button content="Back" onClick={props.handleBack} disabled={props.loading} />
      </View>
    </View>
    <StatusBar />
  </View>
);
