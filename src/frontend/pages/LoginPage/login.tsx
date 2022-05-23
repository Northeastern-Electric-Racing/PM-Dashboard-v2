/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { useHistory } from 'react-router';
import { Role } from '@prisma/client';
import { exampleAllUsers } from '../../../test-support/test-data/users.stub';
import { useAuth } from '../../../services/auth.hooks';
import LoginPage from './login-page/login-page';
import './login.module.css';
import { routes } from '../../../shared/routes';

interface LoginProps {
  postLoginRedirect: { url: string; search: string };
}

/**
 * Page for unauthenticated users to do login.
 */
const Login: React.FC<LoginProps> = ({ postLoginRedirect }) => {
  const [devUserRole, setDevUserRole] = useState<string>(Role.APP_ADMIN);
  const history = useHistory();
  const auth = useAuth();

  const redirectAfterLogin = () => {
    console.log(postLoginRedirect);
    if (postLoginRedirect.url === routes.LOGIN) {
      history.push(routes.HOME);
    } else {
      history.push(`${postLoginRedirect.url}${postLoginRedirect.search}`);
    }
  };

  const devFormSubmit = (e: any) => {
    e.preventDefault();
    const user = exampleAllUsers.find((u) => u.role === devUserRole);
    if (!user) throw new Error('user for dev not found from role: ' + devUserRole);
    auth.devSignin(user!);
    redirectAfterLogin();
  };

  const verifyLogin = async (response: any) => {
    const { id_token } = response.getAuthResponse();
    if (!id_token) throw new Error('Invalid login object');
    await auth.signin(id_token);
    redirectAfterLogin();
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
