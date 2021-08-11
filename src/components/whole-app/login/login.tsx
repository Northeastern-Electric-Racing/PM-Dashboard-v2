/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserLogInContext } from '../../app/app-context/app-context';
import { useLogUserIn } from '../../../services/users.hooks';
import { routes } from '../../../shared/routes';
import LoginPage from './login-page/login-page';
import './login.module.css';

/**
 * Page for unauthenticated users to do login.
 */
const Login: React.FC = () => {
  const history = useHistory();
  const serverLogin = useLogUserIn();
  const loginFunc = useContext(UserLogInContext);
  const [emailId, setEmailId] = useState<string>('');
  const storedUrl = localStorage.getItem('redirectUrl');

  const updateEmailId = (event: any) => setEmailId(event.target.value);

  const formSubmit = (event: any) => {
    event.preventDefault();
    serverLogin.mutate(emailId);
  };

  if (serverLogin.isSuccess) {
    loginFunc(emailId);
    history.push(storedUrl || routes.HOME);
    localStorage.removeItem('redirectUrl');
  }

  return (
    <LoginPage
      isLoading={serverLogin.isLoading}
      isError={serverLogin.isError}
      message={serverLogin.error?.message}
      formSubmit={formSubmit}
      emailId={emailId}
      updateEmailId={updateEmailId}
    />
  );
};

export default Login;
