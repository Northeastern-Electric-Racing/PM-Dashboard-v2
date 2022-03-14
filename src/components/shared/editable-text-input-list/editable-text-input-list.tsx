/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Form, InputGroup } from 'react-bootstrap';
import PageBlock from '../page-block/page-block';

interface EditableTextInputListProps {
  title: string;
  items: any[];
  readOnly?: boolean;
  ordered?: boolean;
  add: (val: any) => any;
  remove: (idx: number) => any;
  update: (idx: number, val: any) => any;
}

const EditableTextInputList: React.FC<EditableTextInputListProps> = ({
  title,
  items,
  readOnly,
  ordered,
  add,
  remove,
  update
}) => {
  let listPrepared = items.map((item, index: number) =>
    !readOnly ? (
      <div key={index} className={'mb-2'}>
        <InputGroup>
          <Form.Control
            type="text"
            value={item.toString()}
            onChange={(e) => {
              update(index, e.target.value);
            }}
          />
          <Button type="button" variant="danger" onClick={() => remove(index)}>
            X
          </Button>
        </InputGroup>
      </div>
    ) : (
      <li key={index}>{item}</li>
    )
  );

  const addButton = (
    <Button type="button" variant="success" onClick={() => add('')}>
      + Add New Bullet
    </Button>
  );

  if (!readOnly) {
    listPrepared = [...listPrepared, addButton];
  }
  let builtList = <ul>{listPrepared}</ul>;
  if (ordered) {
    builtList = <ol>{listPrepared}</ol>;
  }

  return (
    <PageBlock title={title} headerRight={<></>} body={<Form.Group>{builtList}</Form.Group>} />
  );
};

export default EditableTextInputList;
