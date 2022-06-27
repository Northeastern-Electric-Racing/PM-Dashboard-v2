/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Nav } from 'react-bootstrap';
import styles from './sidebar.module.css';
import NavPageLinks, { LinkItem } from './nav-page-links/nav-page-links';
import { routes } from '../../../shared/routes';
import {
  faExchangeAlt,
  faFolder,
  faHome,
  faQuestionCircle,
  faPeopleArrows
} from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const linkItems: LinkItem[] = [
    {
      name: 'Home',
      icon: faHome,
      route: routes.HOME
    },
    {
      name: 'Projects',
      icon: faFolder,
      route: routes.PROJECTS
    },
    {
      name: 'Change Requests',
      icon: faExchangeAlt,
      route: routes.CHANGE_REQUESTS
    },
    {
      name: 'Teams',
      icon: faPeopleArrows,
      route: routes.TEAMS
    },
    {
      name: 'Help',
      icon: faQuestionCircle,
      route: routes.HELP
    }
  ];
  return (
    <Nav className={styles.sidebar}>
      <NavPageLinks linkItems={linkItems} />
    </Nav>
  );
};

export default Sidebar;
