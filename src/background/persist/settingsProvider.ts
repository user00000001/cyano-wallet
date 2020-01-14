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
import { setSettings, SettingsState } from '../../redux/settings';
import { GlobalStore } from '../../redux/state';
import { loadSettings, saveSettings } from '../api/settingsApi';

let oldSettings: SettingsState;

export function initSettingsProvider(store: GlobalStore) {
  /**
   * Syncs settings to storage
   */
  store.subscribe(async () => {
    const state = store.getState();
    const settings = state.settings;

    if (oldSettings !== settings) {
      oldSettings = settings;
      await saveSettings(settings);
    }
  });

  /**
   * Loads settings from storage on startup
   */
  loadSettings().then((settings) => {
    if (settings !== null) {
      if (settings.tokens === undefined) {
        settings.tokens = [];
      }
      if (settings.trustedScs === undefined) {
        settings.trustedScs = [];
      }
      store.dispatch(setSettings(settings.address, settings.ssl, settings.net, settings.tokens, settings.trustedScs));
    }
  });
}
