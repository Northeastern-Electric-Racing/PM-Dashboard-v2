/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './nav-user-menu.module.css';

const NavUserMenu: React.FC = () => {
  return (
    <NavDropdown
      className="m-auto"
      title={<FontAwesomeIcon icon={faUserCircle} size="2x" />}
      id="user-dropdown"
      alignRight
    >
      <NavDropdown.Item as="div">
        <Link className="nav-link p-0" role="button" to="/settings">
          Settings
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item as="div">
        <Link className="nav-link p-0" role="button" to="/log-out">
          Log Out
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default NavUserMenu;
