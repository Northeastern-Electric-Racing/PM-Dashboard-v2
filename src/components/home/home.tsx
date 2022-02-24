/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useAuth } from '../../services/auth.hooks';
import UsefulLinks from './useful-links/useful-links';
import styles from './home.module.css';

const Home: React.FC = () => {
  const auth = useAuth();
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Welcome, {auth.user?.emailId}!</h1>
      <UsefulLinks />
    </div>
  );
};

export default Home;
