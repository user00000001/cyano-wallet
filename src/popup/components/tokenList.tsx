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
import { TokenState } from 'src/redux/settings';
import { View } from './view';

interface Props {
  onDel: (contract: string) => void;
  tokens: TokenState[];
}

export const TokenList: React.SFC<Props> = (props) => (
  <View>
    <List className="transferList" divided={true}>
      {props.tokens.map((token, i) => (
        <List.Item key={i}>
          <List.Icon name="times circle outline" size="large" verticalAlign="middle" onClick={() => props.onDel(token.contract)} />
          <List.Content>
            <List.Header>{token.symbol} - {token.name}</List.Header>
            <List.Description>{token.contract}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </View>
);
