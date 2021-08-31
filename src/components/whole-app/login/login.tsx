/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { useHistory } from 'react-router';
import { Role } from 'utils';
import { exampleAllUsers } from '../../../test-support/test-data/users.stub';
import { useAuth } from '../../../services/auth.hooks';
import { routes } from '../../../shared/routes';
import LoginPage from './login-page/login-page';
import './login.module.css';

/**
 * Page for unauthenticated users to do login.
 */
const Login: React.FC = () => {
  const [devUserRole, setDevUserRole] = useState<string>(Role.AppAdmin);
  const history = useHistory();
  const auth = useAuth();

  const devFormSubmit = (e: any) => {
    e.preventDefault();
    const user = exampleAllUsers.find((u) => u.role === devUserRole);
    if (!user) throw new Error('user for dev not found from role: ' + devUserRole);
    auth.devSignin(user!);
    history.push(routes.HOME);
  };

  const verifyLogin = async (response: any) => {
    const id_token: string = response.getAuthResponse().id_token;
    if (!id_token) throw new Error('Invalid login object');
    await auth.signin(id_token);
    history.push(routes.HOME);
  };

  const handleFailure = (response: any) => {
    console.log(response);
  };

  return (
    <LoginPage
      devSetRole={setDevUserRole}
      devFormSubmit={devFormSubmit}
      prodSuccess={verifyLogin}
      prodFailure={handleFailure}
    />
  );
};

export default Login;
