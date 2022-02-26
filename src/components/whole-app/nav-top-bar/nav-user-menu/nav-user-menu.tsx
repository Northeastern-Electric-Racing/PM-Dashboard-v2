/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../services/auth.hooks';
import { routes } from '../../../../shared/routes';
import styles from './nav-user-menu.module.css';

const NavUserMenu: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();

  return (
    <NavDropdown
      className="m-auto"
      title={<FontAwesomeIcon icon={faUserCircle} size="2x" />}
      id="user-dropdown"
      alignRight
    >
      <NavDropdown.ItemText>Logged in as: {auth.user?.emailId}</NavDropdown.ItemText>
      <NavDropdown.Divider />
      <NavDropdown.Item as="div">
        <Link className="nav-link p-0" role="button" to="/settings">
          Settings
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item as="div">
        <Link className="nav-link p-0" role="button" to="/login">
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!}
            //jsSrc={'accounts.google.com/gsi/client'}
            onLogoutSuccess={() => {
              auth!.signout();
              history.push(routes.LOGIN);
            }}
            render={(renderProps) => (
              <button
                className={'nav-link p-0 m-0 ' + styles.logoutButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <Link className="nav-link p-0" role="button" to="/login">
                  Logout
                </Link>
              </button>
            )}
          ></GoogleLogout>
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default NavUserMenu;
