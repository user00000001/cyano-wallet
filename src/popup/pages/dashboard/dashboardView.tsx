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
import { OEP4TokenAmount } from 'src/api/tokenApi';
import { AccountLogoHeader, Filler, Spacer, StatusBar, TokenAmountList, View } from '../../components';

export interface Props {
  nepAmount: string;
  tstAmount: string;
  tsgAmount: string;

  unboundAmount: string;
  ownAddress: string;
  tokens: OEP4TokenAmount[];
  handleSend: () => void;
  handleTransfers: () => void;
  handleReceive: () => void;
  handleWithdraw: () => void;
  handleSwap: () => void;
}

export const DashboardView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true}>
    <View orientation="column" className="part gradient">
      <AccountLogoHeader title="Balances" />
      <View content={true} className="spread-around balance-wrapper">
        <View orientation="column" className="balance">
          <label>TST</label>
          <h1>{props.tstAmount}</h1>
          {/* <h3>{props.tstAmount}</h3>
          <h4 onClick={props.handleSwap} className="unbound"> {props.nepAmount} (Swap)</h4> */}
        </View>
        <View orientation="column" className="balance">
          <label>TSG</label>
          <h3>{props.tsgAmount}</h3>
          <h4 onClick={props.handleWithdraw} className="unbound"> {props.unboundAmount} (Claim)</h4>
        </View>
      </View>
    </View>
    <View orientation="column" fluid={true} content={true} className="spread-around">
      <h1>OEP-4 tokens</h1>
      <Spacer />
      <TokenAmountList tokens={props.tokens} />
      <Spacer />
      <Filler />
      <View className="buttons">
        <Button icon="send" content="Send" onClick={props.handleSend} />
        <Button icon="inbox" content="Receive" onClick={props.handleReceive} />
        <Button icon="list" onClick={props.handleTransfers} />
      </View>
    </View>
    <StatusBar />
  </View>
);
