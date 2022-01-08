/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form } from 'react-bootstrap';
import { FormType } from '../new-change-request-page';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { exampleAllProjects } from '../../../../../test-support/test-data/projects.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import './common-form-fields.module.css';

interface FormTypeProp {
  setFormType: React.Dispatch<React.SetStateAction<FormType>>
}

const CommonFormFields: React.FC<FormTypeProp> = (props: FormTypeProp) => {

  const handleFormType = (event: React.ChangeEvent<any>): void => {
    props.setFormType(event.target.value);
  }

  return (
    <div className={'row'}>
      <div className={'px-4'}>
        Project
        <Form.Control as="select" custom>
          {exampleAllProjects.map((p) => (
            <option>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Work Package
        <Form.Control as="select" custom>
          {exampleAllWorkPackages.map((p) => (
            <option>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Form Type
        <Form.Control as="select" custom onChange={handleFormType}>
          {Object.values(FormType).map((t) => (
            <option>{t}</option>
          ))}
        </Form.Control>
      </div>
    </div>
  );
};

export default CommonFormFields;
