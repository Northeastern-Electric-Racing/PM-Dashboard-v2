/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext } from 'react';
import { useProvideSettings } from '../../../services/settings.hooks';
import { Settings } from '../../../shared/types';
import './app-context-settings.module.css';

export const SettingsContext = createContext<Settings | undefined>(undefined);

const AppContextSettings: React.FC = (props) => {
  const settings = useProvideSettings();
  return <SettingsContext.Provider value={settings}>{props.children}</SettingsContext.Provider>;
};

export default AppContextSettings;
