/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Card } from 'react-bootstrap';
import styles from './page-block.module.css';

interface PageBlockProps {
  title: string;
  headerRight: JSX.Element;
  body: JSX.Element;
}

// Custom card component for page blocks
const PageBlock: React.FC<PageBlockProps> = ({ title, headerRight, body }) => {
  return (
    <Card className={'my-3'} border="dark" bg="light">
      <Card.Body>
        <Card.Title className={styles.header}>
          <h5 className={'float-left mb-0'}>{title}</h5>
          <div className={'float-right'}>{headerRight}</div>
        </Card.Title>
        {body}
      </Card.Body>
    </Card>
  );
};

export default PageBlock;
