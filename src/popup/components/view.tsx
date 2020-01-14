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

interface Props {
  orientation?: 'row' | 'column';

  content?: boolean;
  fluid?: boolean;
  scroll?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const View: React.SFC<Props> = (props) => {
  let className = 'flex';

  if (props.orientation) {
    className += ' ' + props.orientation;
  }

  if (props.fluid) {
    className += ' ' + 'full';
  }

  if (props.content) {
    className += ' ' + 'content';
  }

  if (props.scroll) {
    className += ' ' + 'scroll-y';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

export const Spacer: React.SFC<{}> = () => (
  <View className="spacer"/>
);

export const Filler: React.SFC<{}> = () => (
  <View className="filler"/>
);
