/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import AppContextAuth from '../app-context-auth/app-context-auth';
import AppContextQuery from '../app-context-query/app-context-query';
import './app-context.module.css';

const AppContext: React.FC = (props) => {
  return (
    <AppContextQuery>
      <AppContextAuth>{props.children}</AppContextAuth>
    </AppContextQuery>
  );
};

export default AppContext;
