/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import AppContext from '../app-context/app-context';
import AppCore from '../app-core/app-core';
import './app-main.module.css';

const AppMain: React.FC = () => {
  return (
    <AppContext>
      <AppCore />
    </AppContext>
  );
};

export default AppMain;
