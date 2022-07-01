/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Theme } from './types';

const themes: Theme[] = [
  {
    name: 'DARK',
    bgColor: '#353434',
    cardBg: 'dark',
    cardBorder: 'light'
  },
  {
    name: 'LIGHT',
    bgColor: '#ffffff',
    cardBg: 'light',
    cardBorder: 'dark'
  }
];

export default themes;
