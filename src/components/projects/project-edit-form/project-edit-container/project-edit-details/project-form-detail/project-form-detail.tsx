/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { useContext } from 'react';
import { Project } from 'utils';
import { EditModeContext } from '../../project-edit-container';
import {
  weeksPipe,
  wbsPipe,
  endDatePipe,
  fullNamePipe,
  listPipe
} from '../../../../../../shared/pipes';
import { Form } from 'react-bootstrap';

interface ProjectFormDetailProps {
  type: string;
  isReadonly: boolean;
  details: Project;
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

const ProjectFormDetail: React.FC<ProjectFormDetailProps> = ({ type, isReadonly, details }) => {
  const editMode = useContext(EditModeContext);
  const workPkg = details.workPackages[0];
  const typeModifier = new Map([
    ['title', new Modifier('Work Package Name:', 'text', details.name)],
    ['wbs', new Modifier('WBS #:', 'text', wbsPipe(details.wbsNum))],
    [
      'project-lead',
      new Modifier('Project Lead:', 'text', listPipe(details.projectLead, fullNamePipe))
    ],
    [
      'project-manager',
      new Modifier('Project Manager: ', 'text', fullNamePipe(details.projectManager))
    ],
    ['duration', new Modifier('Duration: ', 'number', weeksPipe(workPkg.duration))],
    ['start-date', new Modifier('Start Date: ', 'date', workPkg.startDate.toLocaleDateString())],
    [
      'end-date',
      new Modifier('End Date: ', 'date', endDatePipe(workPkg.startDate, workPkg.duration))
    ],
    ['progress', new Modifier('Progress: ', 'number', `${workPkg.progress}%`)],
    [
      'slide-deck',
      new Modifier(
        'Slide Deck: ',
        'link',
        details.slideDeckLink === '' ? 'Enter Link Here...' : details.slideDeckLink
      )
    ],
    [
      'task-list',
      new Modifier(
        'Task List: ',
        'link',
        details.taskListLink === '' ? 'Enter Link Here...' : details.taskListLink
      )
    ],
    [
      'bom',
      new Modifier('BOM: ', 'link', details.bomLink === '' ? 'Enter Link Here...' : details.bomLink)
    ],
    [
      'google-drive',
      new Modifier(
        'Google Drive: ',
        'link',
        details.gDriveLink === '' ? 'Enter Link Here...' : details.gDriveLink
      )
    ]
  ]);

  /* not the ideal implementation of this; I just don't know a better way to implement
       the functionality of conditionally making an entry readonly. */
  if (isReadonly) {
    return (
      <Form.Group>
        <b>{typeModifier.get(type)?.title}</b>{' '}
        {editMode ? (
          <Form.Control
            type={typeModifier.get(type)?.inputType}
            placeholder={typeModifier.get(type)?.value}
            readOnly
          />
        ) : (
          typeModifier.get(type)?.value
        )}
        <br />
      </Form.Group>
    );
  } else {
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
  }
};

export default ProjectFormDetail;
