/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React, { useState } from 'react';
import { Button, Card, Dropdown, Form, FormGroup } from 'react-bootstrap';
import { ChangeRequestType } from 'utils';
import { ChangeRequestReason } from 'utils/src';
import styles from './change-requests-filter.module.css';

interface FilterFieldStateProps {
  update: (
    type: string,
    impact: number[],
    reason: string,
    state: number[],
    implemented: string
  ) => void;
}

const ChangeRequestsFilter: React.FC<FilterFieldStateProps> = ({
  update
}: FilterFieldStateProps) => {
  const [type, setType] = useState('');
  const [impact, setImpact] = useState<number[]>([]);
  const [reason, setReason] = useState('');
  const [state, setState] = useState<number[]>([]);
  const [implemented, setImplemented] = useState('');

  const genDropdownItems = (
    values: string[],
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const none = (
      <Dropdown.Item key={'None'} onClick={() => setter('')}>
        None
      </Dropdown.Item>
    );
    const result: any[] = [none];
    for (const value of values) {
      result.push(
        <Dropdown.Item key={value} onClick={() => setter(value)}>
          {value}
        </Dropdown.Item>
      );
    }
    return <>{result}</>;
  };

  const genCheckboxes = (
    values: string[],
    value: number[],
    setter: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    const toggleValue = (currVal: string): void => {
      const index = values.indexOf(currVal);
      const present = value.indexOf(index) !== -1;

      let newVals = [...value];
      if (present) {
        newVals = newVals.filter((item) => item !== index);
      } else {
        newVals.push(index);
      }

      setter(newVals);
    };

    const result: any[] = [];
    for (const val of values) {
      result.push(
        <Form.Check
          key={val}
          id={val}
          type="checkbox"
          onChange={() => toggleValue(val)}
          label={val}
        />
      );
    }
    return <>{result}</>;
  };

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>Filters</Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle
                data-testid="type-toggle"
                variant="light"
                id="dropdown-split-basic"
                block={true}
                className={'text-left ' + styles.dropdownButton}
              >
                {type}
              </Dropdown.Toggle>
              <Dropdown.Menu className="btn-block" align="right">
                {genDropdownItems(
                  Object.keys(ChangeRequestType).map(
                    (key) => ChangeRequestType[key as typeof ChangeRequestType.Other]
                  ),
                  setType
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <FormGroup>
            <Form.Label>Impact</Form.Label>
            {genCheckboxes(['Scope', 'Budget', 'Timeline'], impact, setImpact)}
          </FormGroup>
          <Form.Group>
            <Form.Label>Reason</Form.Label>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle
                data-testid="reason-toggle"
                variant="light"
                id="dropdown-split-basic"
                block={true}
                className={'text-left ' + styles.dropdownButton}
              >
                {reason}
              </Dropdown.Toggle>
              <Dropdown.Menu className="btn-block" align="right">
                {genDropdownItems(
                  Object.keys(ChangeRequestReason).map(
                    (key) => ChangeRequestReason[key as typeof ChangeRequestReason.Other]
                  ),
                  setReason
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <FormGroup>
            <Form.Label>State</Form.Label>
            {genCheckboxes(['Not Reviewed', 'Accepted', 'Denied'], state, setState)}
          </FormGroup>
          <Form.Group>
            <Form.Label>Implemented</Form.Label>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle
                data-testid="implemented-toggle"
                variant="light"
                id="dropdown-split-basic"
                block={true}
                className={'text-left ' + styles.dropdownButton}
              >
                {implemented}
              </Dropdown.Toggle>
              <Dropdown.Menu className="btn-block" align="right">
                {genDropdownItems(['Yes', 'No'], setImplemented)}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Button
            className={styles.applyButton}
            onClick={() => {
              update(type, impact, reason, state, implemented);
            }}
          >
            Apply
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ChangeRequestsFilter;
