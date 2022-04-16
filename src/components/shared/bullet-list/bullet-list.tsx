/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import PageBlock from '../page-block/page-block';
import styles from './bullet-list.module.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useContext, useState, useEffect, createContext } from 'react';

interface BulletListProps {
  title: string;
  headerRight: JSX.Element;
  list: JSX.Element[];
  ordered?: boolean;
  readOnly?: boolean;
  fieldName?: string;
}

const FormContext = createContext({
  editMode: true,
  setField: (e: string, s: string) => null
});

const BulletList: React.FC<BulletListProps> = ({
  title,
  headerRight,
  list,
  ordered,
  readOnly,
  fieldName
}) => {
  const { editMode, setField } = useContext(FormContext);
  const [bullets, setBullets] = useState(list);
  const [newBullet, setNewBullet] = useState('');

  useEffect(() => {
    setBullets(list);
  }, [editMode, list]);

  function handleAdd() {
    setBullets([...bullets, <>{newBullet}</>]);
  }

  function handleDelete() {}

  function handleChange(fieldName: string, s: string) {
    setField(fieldName, s);
  }

  const addButton = (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Input new bullet here"
        onChange={(e) => setNewBullet(e.target.value)}
      />
      <Button variant="success" onClick={handleAdd}>
        +
      </Button>
    </InputGroup>
  );

  let listPrepared = bullets.map((bullet, idx) =>
    editMode && !readOnly ? (
      <InputGroup aria-required>
        <Form.Control
          required
          type="text"
          defaultValue={bullet.props.children}
          placeholder={bullet.props.children}
          key={idx}
          onChange={(e) => handleChange(`${fieldName}${idx}`, e.target.value)}
        />
        <Button variant="danger" key={idx} onClick={handleDelete}>
          X
        </Button>
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
