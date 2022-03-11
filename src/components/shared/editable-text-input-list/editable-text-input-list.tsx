/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React from 'react';
import { useState, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

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
  const [lastInput, setLastInput] = useState(
    items.length > 0 ? items[items.length - 1].toString() : ''
  );
  const focusRef = useRef<HTMLInputElement>(null);

  /**
   * Handles key presses in the form control.
   * @param e the event of the key press
   * @param index the index of the input being pressed within the items list
   */
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === 'Enter') {
      if (lastInput) {
        addButtonOnClick();
      }
      focusRef.current?.focus();
    }
  };

  /**
   * On click function for the add button.
   */
  const addButtonOnClick = () => {
    add('');
    setLastInput('');
  };

  /**
   * On click function for the remove button
   * @param index the index of the input being removed
   */
  const removeButtonOnClick = (index: number) => {
    remove(index);
    if (isLastElement(index)) {
      setLastInput(items.length >= 2 ? items[index - 1] : '');
    }
  };

  /**
   * Checks if the given index is the last element of items.
   * @param index the given index
   * @returns true if the index is the last element of items
   */
  const isLastElement = (index: number) => {
    return index === items.length - 1;
  };

  return (
    <>
      {items.map((item, index: number) => (
        <div key={index} className={'mb-2'}>
          <InputGroup>
            <Form.Control
              autoFocus={isLastElement(index)}
              type="text"
              ref={isLastElement(index) ? focusRef : null}
              value={item.toString()}
              onKeyDown={(e: any) => handleKeyDown(e, index)}
              onChange={(e) => {
                update(index, e.target.value);
                if (isLastElement(index)) {
                  setLastInput(e.target.value);
                }
              }}
            />
            <Button type="button" variant="danger" onClick={() => removeButtonOnClick(index)}>
              X
            </Button>
          </InputGroup>
        </div>
      ))}
      <Button type="button" variant="success" onClick={addButtonOnClick}>
        + Add New Bullet
      </Button>
    </>
  );
};

export default EditableTextInputList;
