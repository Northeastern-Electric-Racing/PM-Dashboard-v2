/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import './page-title.module.css';

interface PageTitleProps {
  title: string;
  className?: string;
}

// Common component for all page titles
const PageTitle: React.FC<PageTitleProps> = ({ title, className }) => {
  return <h3 className={'mx-5 pt-2 pb-1 ' + className}>{title}</h3>;
};

export default PageTitle;
