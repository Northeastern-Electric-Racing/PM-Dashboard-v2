/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactNode, useState } from 'react';
import PageBlock from '../../layouts/page-block/page-block';
import { Form, Button, Modal } from 'react-bootstrap';
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <div key={idx} className={styles.container}>
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
    </div>
  ));

  builtList.push(
    <div>
      <Button variant="success" onClick={handleShow}>
        Add New Risk
      </Button>
    </div>
  );

  const InputModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Risk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control placeholder={'Enter New Risk Here'} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <PageBlock title={title} headerRight={headerRight}>
      <Form>
        {builtList}
        {InputModal}
      </Form>
    </PageBlock>
  );
};

export default CheckList;
