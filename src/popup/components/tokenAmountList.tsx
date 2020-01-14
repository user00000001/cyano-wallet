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
import { List } from 'semantic-ui-react';
import { OEP4TokenAmount } from 'src/api/tokenApi';
import { View } from './view';

interface Props {
  tokens: OEP4TokenAmount[];
}

export const TokenAmountList: React.SFC<Props> = (props) => (
  <View>
    <List className="transferList" divided={true}>
      {props.tokens.map((token, i) => (
        <List.Item key={i}>
          <List.Icon name="money bill alternate outline" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{token.amount} - {token.symbol}</List.Header>
            <List.Description>{token.name}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </View>
);
