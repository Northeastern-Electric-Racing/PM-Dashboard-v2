/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React, { ReactElement } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';

type FormFieldType = 'select' | 'checkbox';

interface FilterFormField {
  label: string;
  type: FormFieldType;
  values: string[];
  currentValue: number[];
}

interface FilterFieldStateProps {
  filterFields: FilterFormField[];
  setFilterFields: Function;
}

const ChangeRequestsFilter: React.FC<FilterFieldStateProps> = ({
  filterFields,
  setFilterFields
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, label: String) => {
    console.log(label);
    console.log(event.target.id);
    setFilterFields(filterFields);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>, label: String) => {
    console.log(label);
    console.log(event.target.value);
    setFilterFields(filterFields);
  };

  const selectFilterOptions = (filterField: FilterFormField): ReactElement => {
    return (
      <Form.Control
        onChange={(e) =>
          handleSelectChange(e as React.ChangeEvent<HTMLInputElement>, filterField.label)
        }
        as="select"
      >
        {filterField.values.map((value, key) => (
          <option value={String(key)}>{value}</option>
        ))}
      </Form.Control>
    );
  };

  const checkboxFilterOptions = (filterField: FilterFormField): ReactElement => {
    return (
      <>
        {filterField.values.map((value, key) => (
          <Form.Check
            id={key.toString()}
            type="checkbox"
            onChange={(e) =>
              handleCheckboxChange(e as React.ChangeEvent<HTMLInputElement>, filterField.label)
            }
            label={value}
          />
        ))}
      </>
    );
  };

  const filterGroup = (filterField: FilterFormField): ReactElement => {
    return (
      <Form.Group>
        <Form.Label>{filterField.label}</Form.Label>
        {filterField.type === 'select'
          ? selectFilterOptions(filterField)
          : checkboxFilterOptions(filterField)}
      </Form.Group>
    );
  };

  return <>{filterFields.map((field: FilterFormField) => filterGroup(field))}</>;
};

export default ChangeRequestsFilter;
