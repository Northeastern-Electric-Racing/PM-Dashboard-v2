/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import './page-title.module.css';

interface PageTitleProps {
  title: string;
  actionButton?: JSX.Element;
}

// Common component for all page titles
const PageTitle: React.FC<PageTitleProps> = ({ title, actionButton }) => {
  return (
    <div className={'pt-3 pb-1 d-flex justify-content-between'}>
      <h3>{title}</h3>
      <div>{actionButton}</div>
    </div>
  );
};

export default PageTitle;
