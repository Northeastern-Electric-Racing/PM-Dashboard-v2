/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { UserLogInContext } from '../../app/app-context/app-context';
import styles from './login.module.css';

/**
 * Page for unauthenticated users to do login.
 */
const Login: React.FC = () => {
  const history = useHistory();
  const loginFunc = useContext(UserLogInContext);
  const [userName, setUserName] = useState<string>('');

  const updateName = (event: any) => setUserName(event.target.value);

  const formSubmit = (event: any) => {
    event.preventDefault();
    loginFunc(userName);
    history.push('/');
  };

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
              value={userName}
              onChange={updateName}
              placeholder="Name"
              aria-label="name"
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
