/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import PageBlock from '../page-block/page-block';
import styles from './bullet-list.module.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { FormContext } from '../../projects/wbs-details/work-package-container/work-package-container';

interface BulletListProps {
  title: string;
  headerRight: JSX.Element;
  list: JSX.Element[];
  ordered?: boolean;
  readOnly?: boolean;
  fieldName?: string;
}

const BulletList: React.FC<BulletListProps> = ({
  title,
  headerRight,
  list,
  ordered,
  readOnly,
  fieldName
}) => {
  const { editMode, setField } = useContext(FormContext);
  const addButton = (
    <InputGroup>
      <Form.Control type="text" placeholder="Input new bullet here" />
      <Button variant="success">+</Button>
    </InputGroup>
  );
  let listPrepared = list.map((bullet, idx) =>
    editMode && !readOnly ? (
      <InputGroup aria-required>
        <Form.Control
          required
          type="text"
          defaultValue={bullet.props.children}
          placeholder={bullet.props.children}
          key={idx}
          onChange={(e) => setField(`${fieldName}${idx}`, e.target.value)}
        />
        <Button variant="danger">X</Button>
      </InputGroup>
    ) : (
      <li key={idx}>{bullet}</li>
    )
  );
  if (editMode && !readOnly) {
    listPrepared = [...listPrepared, addButton];
  }
  let builtList = <ul className={styles.bulletList}>{listPrepared}</ul>;
  if (ordered) {
    builtList = <ol className={styles.bulletList}>{listPrepared}</ol>;
  }
  return <PageBlock title={title} headerRight={headerRight} body={builtList} />;
};

export default BulletList;
