/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { LinkItem } from '../../../shared/types';
import PageBreadcrumbs from './page-breadcrumbs/page-breadcrumbs';
import styles from './page-title.module.css';

interface PageTitleProps {
  title: string;
  previousPages: LinkItem[];
  actionButton?: JSX.Element;
}

/**
 * Build the page title section for a page.
 * @param title The title of the page
 * @param previousPages The pages in the breadcrumb between home and the current page
 * @param actionButton The button to display on the right side of the page title
 */
const PageTitle: React.FC<PageTitleProps> = ({ title, previousPages, actionButton }) => {
  return (
    <div className={'pt-3 d-flex justify-content-between align-items-center'}>
      <div>
        <PageBreadcrumbs currentPageTitle={title} previousPages={previousPages} />
        <h3 className={styles.titleText}>{title}</h3>
      </div>
      <div>{actionButton}</div>
    </div>
  );
};

export default PageTitle;
