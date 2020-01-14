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
import { get } from 'lodash';
import { isHexadecimal } from 'src/api/utils';
import { utils } from 'tesrasdk-ts';
export function validMnemonics(value: string) {
  try {
    utils.parseMnemonic(value);
    return false;
  } catch (e) {
    return true;
  }
}

export function samePassword(values: object) {
  const password = get(values, 'password', '');
  const passwordAgain = get(values, 'passwordAgain', '');

  if (password !== passwordAgain) {
    return {
      passwordAgain: 'Password does not match',
    };
  }

  return {};
}

export function tokenValid(value: string) {
  return required(value) || !isHexadecimal(value) || value.length !== 40;
}

export function required(value: string) {
  return value === undefined || value.trim().length === 0;
}

export function range(from: number, to: number) {
  return function rangeCheck(value: string) {
    if (value === undefined) {
      return true;
    }

    const val = Number(value);
    return val <= from || val > to;
  };
}

export function gt(than: number) {
  return function gtCheck(value: string) {
    if (value === undefined) {
      return true;
    }

    const val = Number(value);
    return val <= than;
  };
}

export function gte(than: number) {
  return function gtCheck(value: string) {
    if (value === undefined) {
      return true;
    }

    const val = Number(value);
    return val < than;
  };
}
