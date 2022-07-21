/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactNode, useState } from 'react';
import PageBlock from '../../layouts/page-block/page-block';
import { Form, Button, ListGroup, ListGroupItem, InputGroup } from 'react-bootstrap';
import styles from './check-list.module.css';

interface CheckListProps {
  title: string;
  headerRight?: ReactNode;
  list: {
    details: string;
    resolved: boolean;
  }[];
}

const CheckList: React.FC<CheckListProps> = ({ title, headerRight, list }) => {
  const [checks, setChecks] = useState(list);

  const handleCheck = (idx: number) => {
    const updatedChecks = checks.map((check, i) => {
      if (i === idx) {
        check.resolved = !check.resolved;
        return check;
      }
      return check;
    });

    setChecks(updatedChecks);
  };

  const builtList = checks.map((check, idx) => (
    <ListGroupItem key={idx} className={styles.container}>
      <Form.Check
        label={
          <p
            style={check.resolved ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
          >
            {check.details}
          </p>
        }
        defaultChecked={check.resolved}
        data-testId={`testCheckbox${idx}`}
        onChange={() => handleCheck(idx)}
      />
      {check.resolved ? (
        <Button variant="danger">Delete</Button>
      ) : (
        <Button variant="success">Convert to CR</Button>
      )}
    </ListGroupItem>
  ));

  builtList.push(
    <ListGroupItem>
      <InputGroup>
        <Form.Control placeholder="Add a new risk" />
        <Button variant="success">+</Button>
      </InputGroup>
    </ListGroupItem>
  );

  return (
    <PageBlock title={title} headerRight={headerRight}>
      <Form>
        <ListGroup>{builtList}</ListGroup>
      </Form>
    </PageBlock>
  );
};

export default CheckList;
