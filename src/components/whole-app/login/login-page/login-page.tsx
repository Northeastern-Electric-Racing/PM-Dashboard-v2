/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import styles from './login-page.module.css';

interface LoginPageProps {
  isLoading: boolean;
  isError: boolean;
  message?: string;
  formSubmit: (e: any) => void;
  emailId: string;
  updateEmailId: (e: any) => void;
}

/**
 * Page for unauthenticated users to do login.
 */
const LoginPage: React.FC<LoginPageProps> = ({
  isLoading,
  isError,
  message,
  formSubmit,
  emailId,
  updateEmailId
}) => {
  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={message} />;

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

export default LoginPage;
