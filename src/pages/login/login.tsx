/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import styles from './login.module.css';

/**
 * Page for unauthenticated users to do login.
 */
const Login: React.FC = () => {
  return (
    <div className={`card mx-auto mt-sm-5 ${styles.card}`}>
      <div className="card-body">
        <h5 className="card-title">NER PM Dashboard</h5>
        <p className="card-text">Login Required</p>
        <div className={styles.button}>
          <Link to="/">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
