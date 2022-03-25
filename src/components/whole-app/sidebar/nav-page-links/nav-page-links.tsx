/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import styles from './nav-page-links.module.css';
import { useEffect } from 'react';

const NavPageLinks: React.FC = () => {
  useEffect(() => {
    const rows = document.getElementsByClassName(styles.row);
    Array.from(rows).forEach((row) => {
      const current = row as HTMLElement;
      if (
        Array.from(row.children).includes(
          Array.from(document.getElementsByClassName(styles.active))[0]
        ) ||
        current.matches(':hover')
      ) {
        current.style.backgroundColor = 'white';
      } else {
        current.style.backgroundColor = 'transparent';
      }
    });
  });

  return (
    <div className={styles.navPageLinks}>
      <Nav.Item className={styles.row}>
        <NavLink to="/" exact activeClassName={styles.active} className={styles.container}>
          <FontAwesomeIcon className={styles.iconsAndText} icon={faHome} size="2x" />
          <p className={styles.iconsAndText}>Home</p>
        </NavLink>
      </Nav.Item>
      <Nav.Item className={styles.row}>
        <NavLink to="/projects" exact activeClassName={styles.active} className={styles.container}>
          <FontAwesomeIcon className={styles.iconsAndText} icon={faFolder} size="2x" />
          <p className={styles.iconsAndText}>Projects</p>
        </NavLink>
      </Nav.Item>
      <Nav.Item className={styles.row}>
        <NavLink
          to="/change-requests"
          exact
          activeClassName={styles.active}
          className={styles.container}
        >
          <FontAwesomeIcon className={styles.iconsAndText} icon={faExchangeAlt} size="2x" />
          <p className={styles.iconsAndText}>Change Requests</p>
        </NavLink>
      </Nav.Item>
    </div>
  );
};

export default NavPageLinks;
