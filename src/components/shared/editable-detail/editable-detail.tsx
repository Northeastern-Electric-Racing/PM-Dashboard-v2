/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { FormContext } from '../../projects/wbs-details/work-package-container/work-package-container';
import { Form, InputGroup } from 'react-bootstrap';

interface EditableDetailProps {
  title: string;
  type: string;
  value: string;
  fieldName?: string;
  readOnly?: Boolean;
  suffix?: string;
  min?: number;
  max?: number;
}

const EditableDetail: React.FC<EditableDetailProps> = ({
  title,
  type,
  value,
  readOnly,
  suffix,
  fieldName,
  min,
  max
}) => {
  const { editMode, setField } = useContext(FormContext);
  const detailInput = (
    <InputGroup aria-required>
      <Form.Control
        required
        type={type}
        defaultValue={value}
        placeholder={value}
        onChange={(e) => setField(fieldName!, e.target.value)}
        min={min}
        max={max}
      />
      {suffix ? <InputGroup.Text>{suffix}</InputGroup.Text> : ''}
    </InputGroup>
  );

  if (suffix && suffix !== '%') {
    suffix = ' ' + suffix;
  }

  return (
    <Form.Group aria-required>
      <b>{`${title}: `}</b>
      {editMode && !readOnly ? detailInput : `${value}${suffix ? `${suffix}` : ''}`}
      <br />
    </Form.Group>
  );
};

export default EditableDetail;
