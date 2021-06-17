/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { UserContext } from '../app/app-context/app-context';
import styles from './home.module.css';

const Home: React.FC = () => {
  const user = useContext(UserContext);
  return (
    <>
      <h1 className={styles.title}>This is the Home Page</h1>
      <h1 className={styles.title}>Welcome, {user}!</h1>
    </>
  );
};

export default Home;
