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
import { withProps } from '../../../compose';
import { IdentitiesAddView, Props } from './identitiesAddView';

const enhancer = (Component: React.ComponentType<Props>) => (props: RouterProps) =>
  withProps(
    {
      handleBack: () => {
        props.history.push('/identity/change');
      },
      handleCreate: () => {
        props.history.push('/identity/create');
      },
      handleImport: () => {
        props.history.push('/identity/import');
      },
      handleRestore: () => {
        props.history.push('/identity/restore');
      },
    },
    (injectedProps) => <Component {...injectedProps} />,
  );

export const IdentitiesAdd = enhancer(IdentitiesAddView);
