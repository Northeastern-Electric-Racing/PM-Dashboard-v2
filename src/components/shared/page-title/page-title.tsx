/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './page-title.module.css';

interface PageTitleProps {
  title: string;
  actionButton?: JSX.Element;
}

// Common component for all page titles
const PageTitle: React.FC<PageTitleProps> = ({ title, actionButton }) => {
  return (
    <div className={'mx-5 pt-3 pb-1 ' + styles.titleRow}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.actionButton}>{actionButton}</div>
    </div>
  );
};

export default PageTitle;
