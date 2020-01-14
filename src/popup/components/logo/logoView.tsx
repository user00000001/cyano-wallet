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
import { View } from '../view';

export interface Props {
  handleSettings: () => void;
}
export const LogoView: React.SFC<Props> = (props) => (
  <View orientation="column" className="logo"> 
    <View className="spread">
      <View orientation="row" fluid={true} className="buttons">
        <Button size="big" compact={true} basic={true} icon="cog" className="hidden" />
      </View>
      <img width="120" src={require('../../assets/gem2.svg')} />
      <View orientation="row" fluid={true} className="buttons">
        <Button onClick={props.handleSettings} size="big" compact={true} basic={true} icon="cog" />
      </View>
    </View>
    <h1 className="header">Cyano Wallet</h1>
    <p className="subtitle">an Tesra wallet</p>
  </View>
);
