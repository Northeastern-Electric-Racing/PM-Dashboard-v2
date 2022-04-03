/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { SyntheticEvent, useState, SetStateAction, Dispatch } from 'react';
import { Project, WbsNumber, WorkPackage } from 'utils';
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
import { useAllUsers } from '../../../../services/users.hooks';
import ErrorPage from '../../../shared/error-page/error-page';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import WorkPackageSummary from '../../wbs-details/project-container/work-package-summary/work-package-summary';

interface EditFormContainerProps {
  wbsNum: WbsNumber;
  proj: Project;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const ProjectEditContainer: React.FC<EditFormContainerProps> = ({ wbsNum, proj, setEditMode }) => {
  const [slideDeck, setSlideDeck] = useState(proj.slideDeckLink);
  const [taskList, setTaskList] = useState(proj.taskListLink);
  const [bom, setBom] = useState(proj.bomLink);
  const [gDrive, setGDrive] = useState(proj.gDriveLink);

  const updateSlideDeck = (url: string | undefined) => setSlideDeck(url);
  const updateTaskList = (url: string | undefined) => setTaskList(url);
  const updateBom = (url: string | undefined) => setBom(url);
  const updateGDrive = (url: string | undefined) => setGDrive(url);

  const [goals, setGoals] = useState(proj!.goals.map((goal) => goal.detail));
  const [features, setFeatures] = useState(proj!.features.map((feature) => feature.detail));
  const [otherConstraints, setOther] = useState(
    proj!.otherConstraints.map((constraint) => constraint.detail)
  );
  const [rules, setRules] = useState(proj!.rules);
  const { isLoading, isError, data, error } = useAllUsers();

  const notEmptyString = (s: string) => s !== '';

  const goalsUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = goals.slice();
      if (clone.length === 0 || clone.every(notEmptyString)) clone.push(val);
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
      if (clone.length === 0 || clone.every(notEmptyString)) clone.push(val);
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
      if (clone.length === 0 || clone.every(notEmptyString)) clone.push(val);
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
      if (clone.length === 0 || clone.every(notEmptyString)) clone.push(val);
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

  const isValidURL = (url: string | undefined) => {
    if (url !== undefined) {
      try {
        new URL(url);
        return true;
      } catch (_) {
        alert('Invalid URL provided.');
      }
    } else {
      alert('URL not provided.');
    }
    return false;
  };

  const checkValidity = () => {
    return [slideDeck, taskList, bom, gDrive].every(isValidURL);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { currentTarget } = event;
    console.log(currentTarget);

    if (checkValidity() === false) {
      event.stopPropagation();
    }
  };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PageTitle title={`${wbsPipe(wbsNum)} - ${proj!.name}`} />
        <Form.Control className="m-4 w-25" type="number" placeholder="Change Request ID #" />
        <ProjectEditDetails
          project={proj!}
          users={data!}
          updateSlideDeck={updateSlideDeck}
          updateTaskList={updateTaskList}
          updateBom={updateBom}
          updateGDrive={updateGDrive}
        />
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
        <PageBlock
          title={'Work Packages'}
          headerRight={<></>}
          body={
            <>
              {proj!.workPackages.map((ele: WorkPackage) => (
                <div key={wbsPipe(ele.wbsNum)} className="mt-3">
                  <WorkPackageSummary workPackage={ele} />
                </div>
              ))}
            </>
          }
        />
        <EditModeOptions setEditMode={setEditMode} />
      </Form>
    </>
  );
};

export default ProjectEditContainer;
