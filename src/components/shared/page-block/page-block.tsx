/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Card } from 'react-bootstrap';
import { useSettings } from '../../../services/settings.hooks';
import styles from './page-block.module.css';

interface PageBlockProps {
  title: string;
  headerRight: JSX.Element;
  body: JSX.Element;
}

// Custom card component for page blocks
const PageBlock: React.FC<PageBlockProps> = ({ title, headerRight, body }) => {
  const settings = useSettings();
  return (
    <Card
      className={'mx-4 my-3'}
      border={settings.darkMode ? 'light' : 'dark'}
      bg={settings.darkMode ? 'dark' : 'light'}
    >
      <Card.Body>
        <Card.Title className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.headerRight}>{headerRight}</div>
        </Card.Title>
        {body}
      </Card.Body>
    </Card>
  );
};

export default PageBlock;
