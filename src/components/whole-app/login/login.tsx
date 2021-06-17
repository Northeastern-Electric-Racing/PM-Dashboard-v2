/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { UserLogInContext } from '../../app/app-context/app-context';
import { useLogUserIn } from '../../../services/users.hooks';
import { routes } from '../../../shared/routes';
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import styles from './login.module.css';

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

  if (serverLogin.isLoading) return <LoadingIndicator />;

  if (serverLogin.isError) return <ErrorPage message={serverLogin.error?.message} />;

  return (
    <div className={`card mx-auto mt-sm-5 ${styles.card}`}>
      <div className="card-body">
        <h5 className="card-title">NER PM Dashboard</h5>
        <p id="login-text" className="card-text">
          Login Required
        </p>
        <Form onSubmit={formSubmit}>
          <InputGroup>
            <FormControl
              value={emailId}
              onChange={updateEmailId}
              placeholder="Email ID"
              aria-label="emailId"
              aria-describedby="login-text"
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Login;
