/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Nav } from 'react-bootstrap';
import styles from './nav-page-links.module.css';
import { useEffect } from 'react';

export interface LinkItem {
  name: string;
  icon: IconProp;
  route: string;
}

interface NavPageLinkProps {
  linkItems: LinkItem[];
}

const NavPageLinks: React.FC<NavPageLinkProps> = ({ linkItems }: NavPageLinkProps) => {
  useEffect(() => {
    const rows = document.getElementsByClassName(styles.row);
    Array.from(rows).forEach((row) => {
      const current = row as HTMLElement;
      if (
        Array.from(row.children).includes(
          Array.from(document.getElementsByClassName(styles.active))[0]
        )
      ) {
        current.style.backgroundColor = 'white';
      } else {
        current.style.backgroundColor = 'transparent';
      }
    });
  });
  const genNavItems = (linkItems: LinkItem[]) => {
    return linkItems.map((item) => {
      return (
        <Nav.Item key={item.name} className={styles.row}>
          <NavLink
            to={item.route}
            className={styles.container}
            activeClassName={styles.active}
            exact
          >
            <FontAwesomeIcon icon={item.icon} size="2x" className={styles.iconsAndText} />
            <p className={styles.iconsAndText}>{item.name}</p>
          </NavLink>
        </Nav.Item>
      );
    });
  };
  return <div className={styles.navPageLinks}>{genNavItems(linkItems)}</div>;
};

export default NavPageLinks;
