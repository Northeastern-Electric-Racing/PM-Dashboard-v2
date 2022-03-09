/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Nav } from 'react-bootstrap';
import styles from './sidebar.module.css';
import NavPageLinks from './nav-page-links/nav-page-links';

const Sidebar: React.FC = () => {
  return (
    <Nav className={`ml-auto ${styles.sidebar}`}>
      <NavPageLinks />
    </Nav>
  );
};

export default Sidebar;
