/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Form, InputGroup } from 'react-bootstrap';

interface EditableTextInputListProps {
  items: any[];
  readOnly?: boolean;
  ordered?: boolean;
  add: (val: any) => any;
  remove: (idx: number) => any;
  update: (idx: number, val: any) => any;
}

const EditableTextInputList: React.FC<EditableTextInputListProps> = ({
  items,
  readOnly,
  ordered,
  add,
  remove,
  update
}) => {
  let listPrepared = items.map((item, index: number) =>
    !readOnly ? (
      <li key={index} className={'mb-2'}>
        <InputGroup>
          <Form.Control
            type="text"
            value={item.toString()}
            onChange={(e) => {
              update(index, e.target.value);
            }}
            placeholder={"Input new bullet here..."}
          />
          <Button type="button" variant="danger" onClick={() => remove(index)}>
            X
          </Button>
        </InputGroup>
      </li>
    ) : (
      <li key={index}>{item}</li>
    )
  );

  const addButton = (
    <Button type="button" variant="success" onClick={() => add('')}>
      + Add New Bullet
    </Button>
  );

  const style = readOnly ? {} : { listStyleType: 'none', padding: 0 };

  if (!readOnly) {
    listPrepared = [...listPrepared, addButton];
  }
  let builtList = <ul style={style}>{listPrepared}</ul>;
  if (ordered) {
    builtList = <ol style={style}>{listPrepared}</ol>;
  }

  return <Form.Group>{builtList}</Form.Group>;
};

export default EditableTextInputList;
