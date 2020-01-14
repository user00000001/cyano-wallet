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
import { Button, Message } from 'semantic-ui-react';
import { Filler, IdentityLogoHeader, Spacer, StatusBar, View } from '../../../components';

export interface Props {
  loading: boolean;
  identity: string;
  handleConfirm: () => Promise<void>;
  handleCancel: () => void;
}

export const IdentitiesDelView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true}>
    <View orientation="column" className="part gradient">
      <IdentityLogoHeader title="Identity remove" />
      <View content={true} className="spread-around">
        <View>Confirm identity removal. Be sure to have backup.</View>
      </View>
    </View>
    <View orientation="column" fluid={true} content={true}>
      <label>Identity</label>
      <Message>{props.identity}</Message>
      <Spacer />
      <Filler />
      <View className="buttons">
        <Button
          icon="check"
          disabled={props.loading}
          loading={props.loading}
          onClick={props.handleConfirm}
          content="Confirm"
        />
        <Button disabled={props.loading} onClick={props.handleCancel}>
          Cancel
        </Button>
      </View>
    </View>
    <StatusBar />
  </View>
);
