/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form } from 'react-bootstrap';
import { wbsPipe } from '../../../../../shared/pipes';
import { Project, WorkPackage, ChangeRequestType } from 'utils';
import './common-form-fields.module.css';

interface CommonFormFieldsProp {
  setType: React.Dispatch<React.SetStateAction<ChangeRequestType>>;
  projects: Project[];
  workPkgs: WorkPackage[];
  handleChange: (e: any) => void;
}

const CommonFormFields: React.FC<CommonFormFieldsProp> = ({
  projects,
  workPkgs,
  setType,
  handleChange
}) => {
  const handleType = (event: React.ChangeEvent<any>): void => {
    setType(event.target.value);
    handleChange(event);
  };

  return (
    <div className={'row'}>
      <div className={'px-4'}>
        Project
        <Form.Control
          as="select"
          custom
          name="projectWBS"
          type="number"
          onChange={handleChange}
          required
        >
          {projects.map((p) => (
            <option value={p.id}>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Work Package
        <Form.Control
          as="select"
          custom
          name="workPackageWBS"
          type="number"
          onChange={handleChange}
          required
        >
          <option value="-1">No Work Package Selected</option>
          {workPkgs.map((p) => (
            <option value={p.id}>
              {wbsPipe(p.wbsNum)} - {p.name}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className={'px-4'}>
        Type
        <Form.Control
          as="select"
          custom
          onChange={handleType}
          data-testid="type"
          name="type"
          required
        >
          {Object.values(ChangeRequestType)
            .filter((t) => t !== ChangeRequestType.Activation)
            .map((t) => (
              <option value={t}>{t}</option>
            ))}
        </Form.Control>
      </div>
    </div>
  );
};

export default CommonFormFields;
