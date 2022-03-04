/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { EditModeContext } from '../../projects/wbs-details/work-package-container/work-package-container';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

interface EditableDetailProps {
  title: string;
  type: string;
  value: any;
  readOnly?: Boolean;
  suffix?: string;
}

const EditableDetail: React.FC<EditableDetailProps> = ({
  title,
  type,
  value,
  readOnly,
  suffix
}) => {
  const editMode = useContext(EditModeContext);
  const detailInput = (
    <InputGroup>
      <FormControl type={type} defaultValue={value} placeholder={value} />
      {suffix ? <InputGroup.Text>{suffix}</InputGroup.Text> : ''}
    </InputGroup>
  );

  if (suffix && suffix !== '%') {
    suffix = ' ' + suffix;
  }

  return (
    <Form.Group>
      <b>{`${title}: `}</b>
      {editMode && !readOnly ? detailInput : `${value}${suffix ? `${suffix}` : ''}`}
      <br />
    </Form.Group>
  );
};

export default EditableDetail;
