/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { Card } from 'react-bootstrap';
import styles from './page-block.module.css';

interface PageBlockProps {
  title: string;
  headerRight: ReactElement;
  body: ReactElement;
}

// Custom card component for page blocks
const PageBlock: React.FC<PageBlockProps> = ({ title, headerRight, body }) => {
  return (
    <Card className={'mx-4 my-2'} border="dark" bg="light">
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
