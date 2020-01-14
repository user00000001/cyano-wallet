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
import { Filler, IdentityLogoHeader, Spacer, StatusBar, View } from '../../../components';

export interface Props {
  tstId: string;
}

export const IdentityDashboardView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true}>
    <View orientation="column" className="part gradient">
      <IdentityLogoHeader title="My identity" />
      <View content={true}>
        <View orientation="column">
          <h4>Registered TST ID</h4>
          <label>{props.tstId}</label>
        </View>
      </View>
    </View>
    <View orientation="column" fluid={true} content={true} className="spread-around">
      <h1>Verifiable claims</h1>
      <Spacer />
      <Filler />
    </View>
    <StatusBar />
  </View>
);
