/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavUserMenu from '../nav-user-menu/nav-user-menu';
import NavPageLinks from '../nav-page-links/nav-page-links';
import NavNotificationsMenu from '../nav-notifications-menu/nav-notifications-menu';
import styles from './nav-top-bar.module.css';

const NavTopBar: React.FC = () => {
  return (
    <Navbar className={styles.mainBackground} variant="light" expand="md" fixed="top">
      <Navbar.Brand as="div">
        <Link className="d-flex" to="/">
          <img
            className={`d-inline-block align-top ${styles.logo}`}
            src={process.env.PUBLIC_URL + '/favicon.ico'}
            alt="Northeastern Electric Racing Logo"
          />{' '}
          <h3 className={styles.title}>NER PM Dashboard</h3>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="nav-top-bar-items" />
      <Navbar.Collapse id="nav-top-bar-items">
        <Nav className="ml-auto">
          <NavNotificationsMenu />
          <NavPageLinks />
          <NavUserMenu />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavTopBar;
