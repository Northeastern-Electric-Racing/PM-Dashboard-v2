/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext } from 'react';
import { useProvideTheme } from '../../../services/theme.hooks';
import { ThemeUtility } from '../../../shared/types';
import './app-context-theme.module.css';

export const ThemeContext = createContext<ThemeUtility | undefined>(undefined);

const AppContextSettings: React.FC = (props) => {
  const theme = useProvideTheme();
  return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>;
};

export default AppContextSettings;
