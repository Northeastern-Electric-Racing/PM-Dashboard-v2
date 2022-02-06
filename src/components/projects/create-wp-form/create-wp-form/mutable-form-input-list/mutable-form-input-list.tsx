/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Form, InputGroup } from "react-bootstrap";

interface MutableFormInputListProps {
  items: any[];
  setItems: (e: any) => any;
  type: string;
}

const MutableFormInputList: React.FC<MutableFormInputListProps> = ({
  items,
  setItems,
  type
}) => {
  const onUpdate = (index: number, val: any) => {
    setItems(items.splice(index, 1, val));
  };

  const onDelete = (index: number) => {
    setItems(items.splice(index, 1));
  };

  const inputItems = items.map((item, index) => {
    return (
      <li key={index}>
        <InputGroup>
          <Form.Control type={type} defaultValue={items[index]} onChange={(e) => onUpdate(index, e.target.value)} />
          <Button type='button' variant='danger' onClick={() => onDelete(index)}>X</Button>
        </InputGroup>
      </li>
    );
  });

  return (
    <ul>
      {inputItems}
    </ul>
  );
};

export default MutableFormInputList;
