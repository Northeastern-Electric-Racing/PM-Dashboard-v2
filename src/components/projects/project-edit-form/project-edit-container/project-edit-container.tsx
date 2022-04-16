/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { SyntheticEvent, useState, SetStateAction, Dispatch } from 'react';
import { Form } from 'react-bootstrap';
import { DescriptionBullet, Project, WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useAllUsers } from '../../../../services/users.hooks';
import PageTitle from '../../../shared/page-title/page-title';
import EditableTextInputList from '../../../shared/editable-text-input-list/editable-text-input-list';
import { EditableTextInputListUtils } from '../../create-wp-form/create-wp-form';
import ProjectEditDetails from './project-edit-details/project-edit-details';
import EditModeOptions from './edit-mode-options/edit-mode-options';
import ProjectEditSummary from './project-edit-summary/project-edit-summary';
import PageBlock from '../../../shared/page-block/page-block';
import ChangesList from '../../wbs-details/work-package-container/work-package-container-view/changes-list/changes-list';
import ErrorPage from '../../../shared/error-page/error-page';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import WorkPackageSummary from '../../wbs-details/project-container/work-package-summary/work-package-summary';
import { useAuth } from '../../../../services/auth.hooks';
import { useEditSingleProject } from '../../../../services/projects.hooks';

/**
 * Helper function to turn DescriptionBullets into a list of { id:number, detail:string }.
 */
const bulletsToObject = (bullets: DescriptionBullet[]) =>
  bullets
    .filter((bullet) => !bullet.dateDeleted)
    .map((bullet) => {
      return { id: bullet.id, detail: bullet.detail };
    });

interface EditFormContainerProps {
  wbsNum: WbsNumber;
  proj: Project;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const ProjectEditContainer: React.FC<EditFormContainerProps> = ({ wbsNum, proj, setEditMode }) => {
  const auth = useAuth();

  const [crId, setCrId] = useState(-1);
  const [name, setName] = useState(proj.name);
  const [summary, setSummary] = useState(proj.summary);
  const [budget, setBudget] = useState(proj.budget);
  const [wbsElementStatus, setWbsElementStatus] = useState(proj.status);
  const [projectLead, setProjectLead] = useState(proj.projectLead?.userId);
  const [projectManager, setProjectManager] = useState(proj.projectManager?.userId);

  const [slideDeck, setSlideDeck] = useState(proj.slideDeckLink);
  const [taskList, setTaskList] = useState(proj.taskListLink);
  const [bom, setBom] = useState(proj.bomLink);
  const [gDrive, setGDrive] = useState(proj.gDriveLink);

  const updateSlideDeck = (url: string | undefined) => setSlideDeck(url);
  const updateTaskList = (url: string | undefined) => setTaskList(url);
  const updateBom = (url: string | undefined) => setBom(url);
  const updateGDrive = (url: string | undefined) => setGDrive(url);

  const { mutateAsync } = useEditSingleProject();

  const [goals, setGoals] = useState<{ id?: number; detail: string }[]>(
    bulletsToObject(proj!.goals)
  );
  const [features, setFeatures] = useState<{ id?: number; detail: string }[]>(
    bulletsToObject(proj!.features)
  );
  const [otherConstraints, setOther] = useState<{ id?: number; detail: string }[]>(
    bulletsToObject(proj!.otherConstraints)
  );
  const [rules, setRules] = useState(proj!.rules);
  const { isLoading, isError, data, error } = useAllUsers();

  const notEmptyString = (s: string) => s !== '';

  const goalsUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = goals.slice();
      if (clone.length === 0 || clone.map((c) => c.detail).every(notEmptyString))
        clone.push({ detail: val });
      setGoals(clone);
    },
    remove: (idx) => {
      const clone = goals.slice();
      clone.splice(idx, 1);
      setGoals(clone);
    },
    update: (idx, val) => {
      const clone = goals.slice();
      clone[idx].detail = val;
      setGoals(clone);
    }
  };

  const featUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = features.slice();
      if (clone.length === 0 || clone.map((c) => c.detail).every(notEmptyString))
        clone.push({ detail: val });
      setFeatures(clone);
    },
    remove: (idx) => {
      const clone = features.slice();
      clone.splice(idx, 1);
      setFeatures(clone);
    },
    update: (idx, val) => {
      const clone = features.slice();
      clone[idx].detail = val;
      setFeatures(clone);
    }
  };

  const ocUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = otherConstraints.slice();
      if (clone.length === 0 || clone.map((c) => c.detail).every(notEmptyString))
        clone.push({ detail: val });
      setOther(clone);
    },
    remove: (idx) => {
      const clone = otherConstraints.slice();
      clone.splice(idx, 1);
      setOther(clone);
    },
    update: (idx, val) => {
      const clone = otherConstraints.slice();
      clone[idx].detail = val;
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

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const { userId } = auth.user!;

    const payload = {
      projectId: proj.id,
      crId,
      name,
      userId,
      budget,
      summary,
      rules,
      goals,
      features,
      otherConstraints,
      wbsElementStatus,
      googleDriveFolderLink: gDrive,
      slideDeckLink: slideDeck,
      bomLink: bom,
      taskListLink: taskList,
      projectLead,
      projectManager
    };

    await mutateAsync(payload);

    window.location.reload();
  };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PageTitle title={`${wbsPipe(wbsNum)} - ${proj!.name}`} />
        <Form.Control
          className="m-4 w-25"
          type="number"
          placeholder="Change Request ID #"
          required
          min={0}
          onChange={(e) => setCrId(Number(e.target.value))}
        />
        <ProjectEditDetails
          project={proj!}
          users={data!}
          updateSlideDeck={updateSlideDeck}
          updateTaskList={updateTaskList}
          updateBom={updateBom}
          updateGDrive={updateGDrive}
          updateName={setName}
          updateBudget={(val: string) => setBudget(Number(val))}
          updateStatus={setWbsElementStatus}
          updateProjectLead={setProjectLead}
          updateProjectManager={setProjectManager}
        />
        <ProjectEditSummary project={proj!} updateSummary={setSummary} />
        <PageBlock
          title={'Goals'}
          headerRight={<></>}
          body={
            <EditableTextInputList
              items={goals.map((goal) => goal.detail)}
              add={goalsUtil.add}
              remove={goalsUtil.remove}
              update={goalsUtil.update}
            />
          }
        />
        <PageBlock
          title={'Features'}
          headerRight={<></>}
          body={
            <EditableTextInputList
              items={features.map((feature) => feature.detail)}
              add={featUtil.add}
              remove={featUtil.remove}
              update={featUtil.update}
            />
          }
        />
        <PageBlock
          title={'Other Constraints'}
          headerRight={<></>}
          body={
            <EditableTextInputList
              items={otherConstraints.map((other) => other.detail)}
              add={ocUtil.add}
              remove={ocUtil.remove}
              update={ocUtil.update}
            />
          }
        />
        <PageBlock
          title={'Rules'}
          headerRight={<></>}
          body={
            <EditableTextInputList
              items={rules}
              add={rulesUtil.add}
              remove={rulesUtil.remove}
              update={rulesUtil.update}
            />
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
