/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UserContext, UserLogOutContext } from '../../../../app/app-context/app-context';
import './nav-user-menu.module.css';

const NavUserMenu: React.FC = () => {
  const user = useContext(UserContext);
  const logoutFunc = useContext(UserLogOutContext);

  return (
    <NavDropdown
      className="m-auto"
      title={<FontAwesomeIcon icon={faUserCircle} size="2x" />}
      id="user-dropdown"
      alignRight
    >
      <NavDropdown.ItemText>Logged in as: {user}</NavDropdown.ItemText>
      <NavDropdown.Divider />
      <NavDropdown.Item as="div">
        <Link className="nav-link p-0" role="button" to="/settings">
          Settings
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item as="div">
        <p className="nav-link p-0 m-0" role="button" onClick={(e) => logoutFunc()}>
          Log Out
        </p>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default NavUserMenu;
