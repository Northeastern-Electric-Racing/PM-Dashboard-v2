/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './error-page.module.css';

interface ErrorPageProps {
  message?: string;
}

// Common page to display an error
const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className={styles.text}>
      <h3>Oops, sorry!</h3>
      <h5>There was an error loading the page.</h5>
      {message ? <p>{message}</p> : ''}
    </div>
  );
};

export default ErrorPage;
