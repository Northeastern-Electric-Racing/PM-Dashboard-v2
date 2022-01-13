/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form } from 'react-bootstrap';
import { FormType } from '../new-change-request-page';
import { wbsPipe } from '../../../../../shared/pipes';
import { Project, WorkPackage } from 'utils';
import './common-form-fields.module.css';

interface IProp {
  setFormType: React.Dispatch<React.SetStateAction<FormType>>,
  projects: Project[],
  workPkgs: WorkPackage[],
}

const CommonFormFields: React.FC<IProp> = ({projects, workPkgs, setFormType}) => {
  const handleFormType = (event: React.ChangeEvent<any>): void => {
    setFormType(event.target.value);
  }

  return (
    <div className={'row'}>
      <div className={'px-4'}>
        Project
        <Form.Control as="select" custom>
          {projects.map((p, index) => (
            <option>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Work Package
        <Form.Control as="select" custom>
          {workPkgs.map((p, index) => (
            <option>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Form Type
        <Form.Control as="select" custom onChange={handleFormType} data-testid="formType">
          {Object.values(FormType).map((t) => (
            <option>{t}</option>
          ))}
        </Form.Control>
      </div>
    </div>
  );
};

export default CommonFormFields;
