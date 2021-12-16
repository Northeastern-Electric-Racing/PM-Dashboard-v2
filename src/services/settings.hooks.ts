/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useContext } from 'react';
import { SettingsContext } from '../components/app/app-context-settings/app-context-settings';
import { Settings } from '../shared/types';

// Provider hook that creates settings object and handles state
export const useProvideSettings = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return {
    darkMode,
    toggleDarkMode
  } as Settings;
};

// Hook for child components to get the settings object
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) throw Error('Settings must be used inside of context.');
  return context;
};
