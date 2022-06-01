/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useContext } from 'react';
import { ThemeContext } from '../frontend/app/app-context-theme/app-context-theme';
import { Theme } from '../shared/types';
import themes from '../shared/themes';

// Provider hook that creates theme object and handles state
export const useProvideTheme = () => {
  // eslint-disable-next-line prefer-destructuring
  const defaultTheme = themes[0];

  const [bgColor, setBgColor] = useState(defaultTheme.bgColor);
  const [cardBg, setCardBg] = useState(defaultTheme.cardBg);
  const [themeName, setThemeName] = useState(defaultTheme.themeName);
  const [cardBorder, setCardBorder] = useState(defaultTheme.cardBorder);

  const toggleTheme = (theme: Theme) => {
    setBgColor(theme.bgColor);
    setCardBg(theme.cardBg);
    setThemeName(theme.themeName);
    setCardBorder(theme.cardBorder);
  };

  return {
    bgColor,
    cardBg,
    themeName,
    cardBorder,
    toggleTheme
  } as Theme;
};

// Hook for child components to get the theme object
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) throw Error('Settings must be used inside of context.');
  return context;
};
