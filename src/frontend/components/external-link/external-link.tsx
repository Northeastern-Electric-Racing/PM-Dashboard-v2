/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import './external-link.module.css';

interface ExternalLinkProps {
  link: string;
  description: string;
}

// Common component for all external links to open in new tab
const ExternalLink: React.FC<ExternalLinkProps> = ({ link, description }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {description}
    </a>
  );
};

export default ExternalLink;
