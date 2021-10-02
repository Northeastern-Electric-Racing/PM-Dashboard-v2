/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { Form } from 'react-bootstrap';

type FormFieldType = "select" | "checkbox";

interface FilterFormField {
  label: string;
  type: FormFieldType;
  values: string[];
  currentValue: number[];
}

interface FilterFieldStateProps {
  filterFields: FilterFormField[];
  setFilterFields?: Function;
}

const selectFilterOptions = (filterField: FilterFormField): ReactElement => {
  return <Form.Control as="select">
    {filterField.values.map(value => <option value={value}>{value}</option>)}
  </Form.Control>
}

const filterGroup = (filterField: FilterFormField): ReactElement => {
  return <Form.Group>
    <Form.Label>{filterField.label}</Form.Label>
    {filterField.type === "select" ? selectFilterOptions(filterField) : <h1>No</h1>}
  </Form.Group>
}

const ChangeRequestsFilter: React.FC<FilterFieldStateProps> = ({filterFields}) => {
  return <div>{ filterFields.map((field: FilterFormField) => filterGroup(field)) }</div>
};

export default ChangeRequestsFilter;
