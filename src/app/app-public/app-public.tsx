/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Switch, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import './app-public.module.css';

const AppPublic: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="*" component={Login} />
    </Switch>
  );
};

export default AppPublic;
