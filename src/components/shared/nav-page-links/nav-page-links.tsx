/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFolder, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import './nav-page-links.module.css';

const NavPageLinks: React.FC = () => {
  return (
    <>
      <Nav.Item className="m-auto">
        <Link className="nav-link d-flex flex-column" to="/">
          <FontAwesomeIcon className="mx-auto" icon={faHome} size="lg" />
          <p className="mx-auto mb-0">Home</p>
        </Link>
      </Nav.Item>
      <Nav.Item className="m-auto">
        <Link className="nav-link d-flex flex-column" to="/projects">
          <FontAwesomeIcon className="mx-auto" icon={faFolder} size="lg" />
          <p className="mx-auto mb-0">Projects</p>
        </Link>
      </Nav.Item>
      <Nav.Item className="m-auto">
        <Link className="nav-link d-flex flex-column" to="/change-requests">
          <FontAwesomeIcon className="mx-auto" icon={faExchangeAlt} size="lg" />
          <p className="mx-auto mb-0">Changes</p>
        </Link>
      </Nav.Item>
    </>
  );
};

export default NavPageLinks;
