/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form } from 'react-bootstrap';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { exampleAllProjects } from '../../../../../test-support/test-data/projects.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import './common-form-fields.module.css';
import {ChangeRequestType}  from 'utils';

const CommonFormFields: React.FC = () => {
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
        Type
        <Form.Control as="select" custom>
<<<<<<< HEAD
          {['New Function', 'Design Issue', 'Other', 'Initiation', 'Stage Gate'].map((t) => (
=======
          {Object.values(ChangeRequestType).map((t) => (       // change from intiation -> Activation
>>>>>>> 9672f4b70e82228720c031b94099cb992fbf4023
            <option>{t}</option>
          ))}
        </Form.Control>
      </div>
    </div>
  );
};

export default CommonFormFields;
