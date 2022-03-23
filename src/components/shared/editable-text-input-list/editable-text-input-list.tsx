/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Form, InputGroup } from "react-bootstrap";

interface EditableTextInputListProps {
  items: any[];
  add: (val: any) => any;
  remove: (idx: number) => any;
  update: (idx: number, val: any) => any;
}

const EditableTextInputList: React.FC<EditableTextInputListProps> = ({
  items,
  add,
  remove,
  update
}) => {
  return (
    <>
      {
        items.map((item, index: number) => (
          <div key={index} className={'mb-2'}>
            <InputGroup>
              <Form.Control required type='text' value={item.toString()} onChange={(e) => {
                update(index, e.target.value);
              }} />
              <Button type='button' variant='danger' onClick={() => remove(index)}>X</Button>
            </InputGroup>
          </div>
        ))
      }
      <Button type='button' variant='success' onClick={() => add('')}>+ Add New Bullet</Button>
    </>
  );
};

export default EditableTextInputList;
