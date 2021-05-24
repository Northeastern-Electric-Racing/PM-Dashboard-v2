/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../shared/routes';
import { UserContext, UserLogInContext } from '../app-context/app-context';
import AppPublic from '../app-public/app-public';
import './app-core.module.css';

const AppCore: React.FC = () => {
  const history = useHistory();

  const user = useContext(UserContext);
  const userLogIn = useContext(UserLogInContext);

  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (user === '' && !storedUserId) {
      history.push(routes.LOGIN);
    } else if (user === '' && storedUserId) {
      userLogIn(storedUserId);
      history.push(routes.HOME);
    }
  }, [user, history, storedUserId, userLogIn]);

  return <AppPublic />;
};

export default AppCore;
