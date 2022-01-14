/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React, { useContext } from 'react';
import { EditModeContext } from '../../projects/wbs-details/work-package-container/work-package-container';
import { Form, FormControl } from 'react-bootstrap';

interface EditableDetailProps {
  title: string;
  type: string;
  value: string;
  readOnly?: Boolean;
}

const EditableDetail: React.FC<EditableDetailProps> = ({ title, type, value, readOnly }) => {
  const editMode = useContext(EditModeContext);
  return (
    <Form.Group>
      <b>{`${title}: `}</b>
      {editMode && !readOnly ? <FormControl type={type} placeholder={value} /> : value}
      <br />
    </Form.Group>
  );
};

export default EditableDetail;
