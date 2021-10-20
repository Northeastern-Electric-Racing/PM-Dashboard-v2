/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React, { ReactElement } from 'react';
import { Card, Container, Form, FormControlProps } from 'react-bootstrap';
import styles from './change-requests-filter.module.css';

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
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
    const index = filterFields.map((field) => field.label as string).indexOf(label);
    const checked = event.target.checked;
    const id = event.target.id;
    if (checked) {
      filterFields[index].currentValue.push(Number(id));
    } else {
      const indexOfId = filterFields[index].currentValue.indexOf(Number(id));
      filterFields[index].currentValue.splice(indexOfId, 1);
    }
    console.log('Changing state');
    setFilterFields(filterFields);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
    console.log(filterFields);
    const index = filterFields.map((field) => field.label as string).indexOf(label);
    const value = event.target.value;
    filterFields[index].currentValue.length = 0;
    filterFields[index].currentValue.push(Number(value));
    console.log('Changing state');
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

  return (
    <div className={styles.filter}>
      <h3>Filters</h3>
      <hr />
      <div className={styles.filterFields}>
        {filterFields.map((field: FilterFormField) => filterGroup(field))}
      </div>
    </div>
  );
};

export default ChangeRequestsFilter;
