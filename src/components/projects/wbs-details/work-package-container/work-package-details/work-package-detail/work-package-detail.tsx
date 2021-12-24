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
    ['title', new Modifier('Work Package Name:', 'text', workPackage.name)]
    //['wbs', new Modifier('WBS #:', 'text', wbsPipe)]
    // ['project-lead', new Modifier()],
    // ['project-manager', new Modifier()],
    // ['duration', new Modifier()],
    // ['start-date', new Modifier()],
    // ['end-date', new Modifier()],
    // ['progress', new Modifier()],
    // ['expected-progress', new Modifier()],
    // ['timeline-status', new Modifier()]
  ]);
  return (
    <Form.Group>
      <b>{typeModifier.get(type)?.title}</b>{' '}
      {editMode ? (
        <Form.Control type={typeModifier.get(type)?.inputType} placeholder={workPackage.name} />
      ) : (
        typeModifier.get(type)?.value
      )}
    </Form.Group>
  );
};

export default WorkPackageDetail;
