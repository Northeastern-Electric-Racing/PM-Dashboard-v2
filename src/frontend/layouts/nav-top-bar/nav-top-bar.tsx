/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import NavUserMenu from './nav-user-menu/nav-user-menu';
import NavNotificationsMenu from './nav-notifications-menu/nav-notifications-menu';
import styles from './nav-top-bar.module.css';
import { useAuth } from '../../../services/auth.hooks';
import { fullNamePipe } from '../../../shared/pipes';
import { useTheme } from '../../../services/theme.hooks';
import themes from '../../../shared/themes';

const NavTopBar: React.FC = () => {
  const auth = useAuth();
  const theme = useTheme();

  const themeIndex = themes.findIndex((element) => element.themeName === theme.themeName);

  const swap = () => {
    const swapTo = themeIndex === 0 ? 1 : 0;
    if (theme.toggleTheme) {
      theme.toggleTheme(themes[swapTo]);
    }
  };

  return (
    <Navbar className={styles.mainBackground} variant="light" expand="md" fixed="top">
      <Navbar.Brand as="div">
        <Link className="d-flex" to={routes.HOME} style={{ textDecoration: 'none' }}>
          <img
            className={`d-inline-block align-top ${styles.logo}`}
            src={'/NER-Logo-App-Icon.png'}
            alt="Northeastern Electric Racing Logo"
          />{' '}
          <h3 className={styles.title}>NER PM Dashboard</h3>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="nav-top-bar-items" />
      <Navbar.Collapse id="nav-top-bar-items">
        <Nav className="ml-auto">
          <Button onClick={swap}>{themeIndex === 0 ? 'Light' : 'Night'}</Button>
          <NavNotificationsMenu />
          <div className={styles.username}>{fullNamePipe(auth.user)}</div>
          <NavUserMenu />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavTopBar;
