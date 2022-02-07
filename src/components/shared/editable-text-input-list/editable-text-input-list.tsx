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
  const itemsList = items.map((item, index: number) => (
    <div key={index} className={index === 0 ? 'mb-2' : 'mt-2'}>
      <InputGroup>
        <Form.Control type='text' value={item.toString()} onChange={(e) => {
          update(index, e.target.value);
        }} />
        {
          index === items.length - 1 ?
            <Button type='button' variant='success' onClick={() => add('')}>+</Button> :
            <Button type='button' variant='danger' onClick={() => remove(index)}>X</Button>
        }
      </InputGroup>
    </div>
  ));

  return (
    <>
      {itemsList}
    </>
  );
};

export default EditableTextInputList;
