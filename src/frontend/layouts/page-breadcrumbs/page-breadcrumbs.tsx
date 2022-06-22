/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { Breadcrumb, Nav } from 'react-bootstrap';
import { LinkItem } from '../../../shared/types';
import { routes } from '../../../shared/routes';
import './page-breadcrumbs.module.css';

interface PageTitleProps {
  currentPageTitle: string;
  previousPages: LinkItem[];
}

// Common component for adding breadcrumbs to a page
const PageBreadcrumbs: React.FC<PageTitleProps> = ({ currentPageTitle, previousPages }) => {
  return (
    <Breadcrumb className="pt-3" as={Nav}>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: routes.HOME }}>
        Home
      </Breadcrumb.Item>
      {previousPages.map((page) => (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: page.route }}>
          {page.name}
        </Breadcrumb.Item>
      ))}
      <Breadcrumb.Item active>{currentPageTitle}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default PageBreadcrumbs;
