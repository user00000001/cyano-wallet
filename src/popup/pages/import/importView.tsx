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
import { Field, Form } from 'react-final-form';
import { Button, Form as SemanticForm, Message } from 'semantic-ui-react';
import { Filler, LogoHeader, Spacer, StatusBar, View } from '../../components';
import { required, samePassword } from '../../utils/validate';

export interface Props {
  handleSubmit: (values: object) => Promise<object>;
  handleCancel: () => void;
  loading: boolean;
}

export const ImportView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true}>
    <View orientation="column" className="part gradient">
      <LogoHeader title="Import private key" />
      <View content={true} className="spread-around">
        <View>Enter your private key and passphrase for account encryption.</View>
      </View>
    </View>
    <View orientation="column" fluid={true} content={true} className="spread-around" scroll={true}>
      <View orientation="column" className="scrollView">
        <View className="content">
          <Form
            onSubmit={props.handleSubmit}
            validate={samePassword}
            render={(formProps) => (
              <SemanticForm onSubmit={formProps.handleSubmit} className="signupForm">
                <View orientation="column">
                  <label>Private key (WIF or HEX format)</label>
                  <Field
                    name="privateKey"
                    validate={required}
                    render={(t) => (
                      <>
                        {t.meta.touched && t.meta.submitError != null ? (
                          <Message size="small">{t.meta.submitError}</Message>
                        ) : null}

                        <SemanticForm.TextArea
                          rows={2}
                          onChange={t.input.onChange}
                          input={{ ...t.input, value: t.input.value }}
                          error={t.meta.touched && t.meta.invalid}
                          disabled={props.loading}
                        />
                      </>
                    )}
                  />
                </View>
                <Spacer />
                <View orientation="column">
                  <label>Password</label>
                  <Field
                    name="password"
                    validate={required}
                    render={(t) => (
                      <SemanticForm.Input
                        onChange={t.input.onChange}
                        input={{ ...t.input, value: t.input.value }}
                        icon="key"
                        type="password"
                        error={t.meta.touched && t.meta.invalid}
                        disabled={props.loading}
                      />
                    )}
                  />
                </View>
                <Spacer />
                <View orientation="column">
                  <label>Password again</label>
                  <Field
                    name="passwordAgain"
                    render={(t) => (
                      <SemanticForm.Input
                        onChange={t.input.onChange}
                        input={{ ...t.input, value: t.input.value }}
                        icon="key"
                        type="password"
                        error={t.meta.touched && t.meta.invalid}
                        disabled={props.loading}
                      />
                    )}
                  />
                </View>
                <Spacer />
                <Filler />
                <View className="buttons">
                  <Button disabled={props.loading} loading={props.loading}>
                    Restore
                  </Button>
                  <Button disabled={props.loading} onClick={props.handleCancel}>
                    Cancel
                  </Button>
                </View>
              </SemanticForm>
            )}
          />
        </View>
      </View>
    </View>
    <StatusBar />
  </View>
);
