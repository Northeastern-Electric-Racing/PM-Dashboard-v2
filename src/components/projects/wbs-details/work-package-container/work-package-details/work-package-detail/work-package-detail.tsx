import { WorkPackage } from 'utils';
import { useContext } from 'react';
import { EditModeContext } from '../../work-package-container';
import {
  weeksPipe,
  wbsPipe,
  endDatePipe,
  fullNamePipe,
  listPipe
} from '../../../../../../shared/pipes';
import { Form } from 'react-bootstrap';

interface WorkPackageDetailProps {
  type: string;
  workPackage: WorkPackage;
}

class Modifier {
  title: string;
  inputType: string;
  value: any;
  constructor(title: string, inputType: string, value: any) {
    this.title = title;
    this.inputType = inputType;
    this.value = value;
  }
}

const WorkPackageDetail: React.FC<WorkPackageDetailProps> = ({ type, workPackage }) => {
  const editMode = useContext(EditModeContext);
  const typeModifier = new Map([
    ['title', new Modifier('Work Package Name:', 'text', workPackage.name)],
    ['wbs', new Modifier('WBS #:', 'text', wbsPipe(workPackage.wbsNum))],
    [
      'project-lead',
      new Modifier('Project Lead:', 'text', listPipe(workPackage.projectLead, fullNamePipe))
    ],
    [
      'project-manager',
      new Modifier('Project Manager: ', 'text', fullNamePipe(workPackage.projectManager))
    ],
    ['duration', new Modifier('Duration: ', 'number', weeksPipe(workPackage.duration))],
    [
      'start-date',
      new Modifier('Start Date: ', 'date', workPackage.startDate.toLocaleDateString())
    ],
    [
      'end-date',
      new Modifier('End Date: ', 'date', endDatePipe(workPackage.startDate, workPackage.duration))
    ],
    ['progress', new Modifier('Progress: ', 'number', `${workPackage.progress}%`)]
  ]);
  return (
    <Form.Group>
      <b>{typeModifier.get(type)?.title}</b>{' '}
      {editMode ? (
        <Form.Control
          type={typeModifier.get(type)?.inputType}
          placeholder={typeModifier.get(type)?.value}
        />
      ) : (
        typeModifier.get(type)?.value
      )}
      <br />
    </Form.Group>
  );
};

export default WorkPackageDetail;
