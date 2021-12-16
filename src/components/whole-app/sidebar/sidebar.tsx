/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { faFolder, faHome, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';
import { routes } from '../../../shared/routes';
import SidebarLink from './sidebar-link/sidebar-link';
import styles from './sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <Navbar className={styles.mainBackground} variant="light" expand="md" fixed="top">
      <Navbar.Toggle aria-controls="sidebar-items" />
      <Navbar.Collapse id="sidebar-items">
        <Nav className="ml-auto">
          <SidebarLink link={routes.HOME} icon={faHome} label={'Home'} />
          <SidebarLink link={routes.PROJECTS} icon={faFolder} label={'Projects'} />
          <SidebarLink link={routes.CHANGE_REQUESTS} icon={faExchangeAlt} label={'Changes'} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;
