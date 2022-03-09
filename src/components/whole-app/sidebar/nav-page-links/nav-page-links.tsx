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
  return (
    <>
      <Nav.Item className='m-auto'>
        <Link className={'nav-link d-flex flex-column ' + styles.iconAndTextContainer} to='/'>
          <FontAwesomeIcon className={'mx-auto ' + styles.iconsAndText} icon={faHome} size='2x' />
          <p className={'mx-auto mb-0 ' + styles.iconsAndText}>Home</p>
        </Link>
      </Nav.Item>
      <Nav.Item className='m-auto'>
        <Link className={'nav-link d-flex flex-column ' + styles.iconAndTextContainer}
              to='/projects'>
          <FontAwesomeIcon className={'mx-auto ' + styles.iconsAndText} icon={faFolder} size='2x' />
          <p className={'mx-auto mb-0 ' + styles.iconsAndText}>Projects</p>
        </Link>
      </Nav.Item>
      <Nav.Item className='m-auto'>
        <Link className={'nav-link d-flex flex-column ' + styles.iconAndTextContainer}
              to='/change-requests'>
          <FontAwesomeIcon className={'mx-auto ' + styles.iconsAndText} icon={faExchangeAlt}
                           size='2x' />
          <p className={'mx-auto mb-0 ' + styles.iconsAndText}>Change Requests</p>
        </Link>
      </Nav.Item>
    </>
  );
};

export default NavPageLinks;
