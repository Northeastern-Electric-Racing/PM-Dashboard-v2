/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import styles from './nav-page-links.module.css';

const NavPageLinks: React.FC = () => {
  const linkClick = (id: string) => {
    const current = document.getElementById(id);
    current!.style.backgroundColor = 'white';
    const { children } = current!;
    for (let i = 0; i < children.length; i++) {
      const currentChild = children[i] as HTMLElement;
      currentChild.style.color = 'red';
    }
  };
  return (
    <div className={styles.navPageLinks}>
      <Nav.Item
        id="home-link"
        onClick={() => {
          linkClick('home-link');
        }}
        className={styles.row}
      >
        <Link to="/" className={styles.container}>
          <FontAwesomeIcon className={styles.iconsAndText} icon={faHome} size="2x" />
          <p className={styles.iconsAndText}>Home</p>
        </Link>
      </Nav.Item>
      <Nav.Item className={styles.row}>
        <Link
          to="/projects"
          id="projects-link"
          onClick={() => {
            linkClick('projects-link');
          }}
          className={styles.container}
        >
          <FontAwesomeIcon className={styles.iconsAndText} icon={faFolder} size="2x" />
          <p className={styles.iconsAndText}>Projects</p>
        </Link>
      </Nav.Item>
      <Nav.Item
        id="changerequests-link"
        onClick={() => {
          linkClick('changerequests-link');
        }}
        className={styles.row}
      >
        <Link to="/change-requests" className={styles.container}>
          <FontAwesomeIcon className={styles.iconsAndText} icon={faExchangeAlt} size="2x" />
          <p className={styles.iconsAndText}>Change Requests</p>
        </Link>
      </Nav.Item>
    </div>
  );
};

export default NavPageLinks;
