/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './sidebar-link.module.css';

interface SidebarLinkProps {
  link: string;
  label: string;
  icon: IconProp;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link, label, icon }) => {
  return (
    <Link className="nav-link d-flex flex-column" to={link}>
      <FontAwesomeIcon className="mx-auto" icon={icon} size="lg" />
      <p className="mx-auto mb-0">{label}</p>
    </Link>
  );
};

export default SidebarLink;
