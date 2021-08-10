/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import GoogleLogin from 'react-google-login';
import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { exampleAllUsers } from '../../../../test-support/test-data/users.stub';
import styles from './login-page.module.css';

interface LoginPageProps {
  devSetRole: (role: string) => void;
  devFormSubmit: (e: any) => any;
  prodSuccess: (res: any) => any;
  prodFailure: (res: any) => any;
}

/**
 * Page for unauthenticated users to do login.
 */
const LoginPage: React.FC<LoginPageProps> = ({
  devSetRole,
  devFormSubmit,
  prodSuccess,
  prodFailure
}) => {
  return (
    <Card className={'mx-auto mt-sm-5 ' + styles.card}>
      <Card.Body>
        <Card.Title>NER PM Dashboard</Card.Title>
        <Card.Text>Login Required. Students must use their Husky Google account.</Card.Text>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!}
          buttonText="Login"
          onSuccess={prodSuccess}
          onFailure={prodFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
        {process.env.NODE_ENV === 'development' ? (
          <Form className="pt-3" onSubmit={devFormSubmit}>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text id="user-select">Select User</InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                onChange={(e: any) => devSetRole(e.target.value)}
                aria-describedby="user-select"
                as="select"
              >
                {exampleAllUsers.map((user) => (
                  <option key={user.role}>{user.role}</option>
                ))}
              </FormControl>
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Log In
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        ) : (
          ''
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        This site uses cookies, you can't escape them.
      </Card.Footer>
    </Card>
  );
};

export default LoginPage;
