/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { SyntheticEvent, useState, SetStateAction, Dispatch, useLayoutEffect } from 'react';
import { Project, User, WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { Form } from 'react-bootstrap';
import PageTitle from '../../../shared/page-title/page-title';
import EditableTextInputList from '../../../shared/editable-text-input-list/editable-text-input-list';
import { EditableTextInputListUtils } from '../../create-wp-form/create-wp-form';
import ProjectEditDetails from './project-edit-details/project-edit-details';
import EditModeOptions from './edit-mode-options/edit-mode-options';
import ProjectEditSummary from './project-edit-summary/project-edit-summary';
import PageBlock from '../../../shared/page-block/page-block';
import ChangesList from '../../wbs-details/work-package-container/changes-list/changes-list';
import ProjectEditWorkPackagesList from './project-edit-wp-list/project-edit-wp-list';
import { useAllUsers } from '../../../../services/users.hooks';

interface EditFormContainerProps {
  wbsNum: WbsNumber;
  proj: Project;
  users: User[];
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const ProjectEditContainer: React.FC<EditFormContainerProps> = ({
  wbsNum,
  proj,
  users,
  setEditMode
}) => {
  const [goals, setGoals] = useState(proj!.goals.map((goal) => goal.detail));
  const [features, setFeatures] = useState(proj!.features.map((feature) => feature.detail));
  const [otherConstraints, setOther] = useState(
    proj!.otherConstraints.map((constraint) => constraint.detail)
  );
  const [rules, setRules] = useState(proj!.rules);

  const goalsUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = goals.slice();
      clone.push(val);
      setGoals(clone);
    },
    remove: (idx) => {
      const clone = goals.slice();
      clone.splice(idx, 1);
      setGoals(clone);
    },
    update: (idx, val) => {
      const clone = goals.slice();
      clone[idx] = val;
      setGoals(clone);
    }
  };
  const featUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = features.slice();
      clone.push(val);
      setFeatures(clone);
    },
    remove: (idx) => {
      const clone = features.slice();
      clone.splice(idx, 1);
      setFeatures(clone);
    },
    update: (idx, val) => {
      const clone = features.slice();
      clone[idx] = val;
      setFeatures(clone);
    }
  };
  const ocUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = otherConstraints.slice();
      clone.push(val);
      setOther(clone);
    },
    remove: (idx) => {
      const clone = otherConstraints.slice();
      clone.splice(idx, 1);
      setOther(clone);
    },
    update: (idx, val) => {
      const clone = otherConstraints.slice();
      clone[idx] = val;
      setOther(clone);
    }
  };
  const rulesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = rules.slice();
      clone.push(val);
      setRules(clone);
    },
    remove: (idx) => {
      const clone = rules.slice();
      clone.splice(idx, 1);
      setRules(clone);
    },
    update: (idx, val) => {
      const clone = rules.slice();
      clone[idx] = val;
      setRules(clone);
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    //event.preventDefault();
    const { currentTarget } = event;
    console.log(currentTarget);
  };

  return (
    <div className="mb-5">
      <Form onSubmit={handleSubmit}>
        <PageTitle title={`${wbsPipe(wbsNum)} - ${proj!.name}`} />
        <ProjectEditDetails project={proj!} users={users} />
        <ProjectEditSummary project={proj!} />
        <PageBlock
          title={'Goals'}
          headerRight={<></>}
          body={
            <Form.Group>
              <EditableTextInputList
                items={goals}
                add={goalsUtil.add}
                remove={goalsUtil.remove}
                update={goalsUtil.update}
              />
            </Form.Group>
          }
        />
        <PageBlock
          title={'Features'}
          headerRight={<></>}
          body={
            <Form.Group>
              <EditableTextInputList
                items={features}
                add={featUtil.add}
                remove={featUtil.remove}
                update={featUtil.update}
              />
            </Form.Group>
          }
        />
        <PageBlock
          title={'Other Constraints'}
          headerRight={<></>}
          body={
            <Form.Group>
              <EditableTextInputList
                items={otherConstraints}
                add={ocUtil.add}
                remove={ocUtil.remove}
                update={ocUtil.update}
              />
            </Form.Group>
          }
        />
        <PageBlock
          title={'Rules'}
          headerRight={<></>}
          body={
            <Form.Group>
              <EditableTextInputList
                items={rules}
                add={rulesUtil.add}
                remove={rulesUtil.remove}
                update={rulesUtil.update}
              />
            </Form.Group>
          }
        />
        <ChangesList changes={proj!.changes} />
        <ProjectEditWorkPackagesList workPackages={proj!.workPackages} />
        <EditModeOptions setEditMode={setEditMode} />
      </Form>
    </div>
  );
};

export default ProjectEditContainer;
