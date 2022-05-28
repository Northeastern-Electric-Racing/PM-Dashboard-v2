/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useAuth } from '../../../services/auth.hooks';
import UsefulLinks from './useful-links/useful-links';
import styles from './home.module.css';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  const auth = useAuth();
  return (
    <Container fluid>
      <h1 className={styles.title}>Welcome, {auth.user?.emailId}!</h1>
      <UsefulLinks />
    </Container>
  );
};

export default Home;
