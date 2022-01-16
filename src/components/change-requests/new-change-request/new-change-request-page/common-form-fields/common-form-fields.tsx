/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form } from 'react-bootstrap';
import { wbsPipe } from '../../../../../shared/pipes';
import { Project, WorkPackage } from 'utils';
import './common-form-fields.module.css';
import { CR_Type } from '@prisma/client';

interface IProp {
  setFormType: React.Dispatch<React.SetStateAction<CR_Type>>,
  projects: Project[],
  workPkgs: WorkPackage[],
  handleChange: (e: any) => void,
}

const crTypeDisplayName = {
  [CR_Type.DEFINITION_CHANGE]: 'New Function',
  [CR_Type.ISSUE]: 'Design Issue',
  [CR_Type.OTHER]: 'Other',
  [CR_Type.ACTIVATION]: 'Initiation',
  [CR_Type.STAGE_GATE]: 'Stage Gate',
}

const CommonFormFields: React.FC<IProp> = ({projects, workPkgs, setFormType, handleChange}) => {
  const handleFormType = (event: React.ChangeEvent<any>): void => {
    setFormType(event.target.value);
    handleChange(event);
  }

  return (
    <div className={'row'}>
      <div className={'px-4'}>
        Project
        <Form.Control as="select" custom name="projectWBS" type="number" onChange={handleChange}>
          {projects.map((p, index) => (
            <option value={p.id}>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Work Package
        <Form.Control as="select" custom name="workPackageWBS" type="number" onChange={handleChange}>
          <option value="-1">No Work Package Selected</option>
          {workPkgs.map((p, index) => (
            <option value={p.id}>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Form Type
        <Form.Control as="select" custom onChange={handleFormType} data-testid="formType" name="type">
          {Object.values(CR_Type).map((t) => (
            <option value={t}>{crTypeDisplayName[t]}</option>
          ))}
        </Form.Control>
      </div>
    </div>
  );
};

export default CommonFormFields;
