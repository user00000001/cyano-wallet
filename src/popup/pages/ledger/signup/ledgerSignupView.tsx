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
import { LedgerLogo, Spacer, StatusBar, View } from '../../../components';

export interface Props {
  supported: boolean;
  handleCancel: () => void;
  handleCreate: () => void;
  handleImport: () => void;
}

export const LedgerSignupView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true} className="gradient">
    <LedgerLogo />
    {props.supported ? (
      <>
        <View orientation="column" className="hint">
          <View>To start using Tesra</View>
          <View>use your Ledger</View>
        </View>
        <View orientation="column" fluid={true} content={true}>
          <View orientation="column" fluid={true} className="center signButtons">
            <Spacer />
            <Button size="small" onClick={props.handleCreate}>New account</Button>
            <Spacer />
            <Button size="small" onClick={props.handleCancel}>Cancel</Button>
          </View>
        </View>
      </>
    ) : (
      <>
        <View orientation="column" className="hint">
          <View>Connect your Ledger</View>
          <View>and open TST app</View>
        </View>
        <View orientation="column" fluid={true} content={true}>
          <View orientation="column" fluid={true} className="center signButtons">
            <Spacer />
            <Button size="small" onClick={props.handleCancel}>Cancel</Button>
          </View>
        </View>
      </>
    )}
  <StatusBar />
  </View>
);
