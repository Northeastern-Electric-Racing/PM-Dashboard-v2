/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, useState, SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';
import { WbsNumber, WorkPackage, WbsElementStatus } from 'utils';
import { useAuth } from '../../../../../services/auth.hooks';
import { useAllUsers } from '../../../../../services/users.hooks';
import { useEditWorkPackage } from '../../../../../services/work-packages.hooks';
import { fullNamePipe, wbsPipe } from '../../../../../shared/pipes';
import EditableTextInputList from '../../../../shared/editable-text-input-list/editable-text-input-list';
import PageBlock from '../../../../shared/page-block/page-block';
import PageTitle from '../../../../shared/page-title/page-title';
import { EditableTextInputListUtils } from '../../../create-wp-form/create-wp-form';
import ChangesList from './changes-list/changes-list';
import DependenciesList from './dependencies-list/dependencies-list';
import EditModeOptions from './edit-mode-options/edit-mode-options';
import WorkPackageButtons from './work-package-buttons/work-package-buttons';
import WorkPackageDetails from './work-package-details/work-package-details';

interface WorkPackageContainerEditProps {
  wbsNum: WbsNumber;
  workPackage: WorkPackage;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export const FormContext = createContext({
  editMode: false,
  setField: (field: string, value: any) => {}
});

const WorkPackageContainerEdit: React.FC<WorkPackageContainerEditProps> = ({
  wbsNum,
  workPackage
}) => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const { mutateAsync } = useEditWorkPackage();
  const { data: userData } = useAllUsers();

  // const expectedActivitiesUtil: EditableTextInputListUtils = {
  //   add: (val) => {
  //     const clone = ea.slice();
  //     clone.push({
  //       id: undefined,
  //       detail: val
  //     });
  //     setEa(clone);
  //   },
  //   remove: (idx) => {
  //     const clone = ea.slice();
  //     clone.splice(idx, 1);
  //     setEa(clone);
  //   },
  //   update: (idx, val) => {
  //     const clone = ea.slice();
  //     clone[idx].detail = val;
  //     setEa(clone);
  //   }
  // };

  // const deliverablesUtil: EditableTextInputListUtils = {
  //   add: (val) => {
  //     const clone = d.slice();
  //     clone.push({
  //       id: undefined,
  //       detail: val
  //     });
  //     setD(clone);
  //   },
  //   remove: (idx) => {
  //     const clone = d.slice();
  //     clone.splice(idx, 1);
  //     setD(clone);
  //   },
  //   update: (idx, val) => {
  //     const clone = d.slice();
  //     clone[idx].detail = val;
  //     setD(clone);
  //   }
  // };

  // states for the form's payload
  const [projectLead, setProjectLead] = useState<string>(fullNamePipe(workPackage.projectLead));
  const [projectManager, setProjectManager] = useState<string>(
    fullNamePipe(workPackage.projectManager)
  );
  const [wbsElementId, setWbsElementId] = useState<WbsNumber>(workPackage.wbsNum);
  const [name, setName] = useState<string>(workPackage.name);
  const [crId, setCrId] = useState<number>(-1);
  const [startDate, setStartDate] = useState<Date>(workPackage.startDate);
  const [duration, setDuration] = useState<number>(workPackage.duration);
  const [dependencies, setDependencies] = useState<WbsNumber[]>(workPackage.dependencies);
  const [expectedActivities, setExpectedActivities] = useState<{ id: number; detail: string }[]>(
    workPackage.expectedActivities.map((ea) => ({
      id: ea.id,
      detail: ea.detail
    }))
  );
  const [deliverables, setDeliverables] = useState<{ id: number; detail: string }[]>(
    workPackage.deliverables.map((d) => ({
      id: d.id,
      detail: d.detail
    }))
  );
  const [status, setStatus] = useState<WbsElementStatus>(workPackage.status);
  const [progress, setProgress] = useState<number>(workPackage.progress);

  const data = {
    projectLead,
    projectManager,
    wbsElementId,
    name,
    crId,
    startDate,
    duration,
    dependencies,
    expectedActivities,
    deliverables,
    status,
    progress,
    changes: workPackage.changes,
    expectedProgress: workPackage.expectedProgress,
    timelineStatus: workPackage.timelineStatus
  };

  const setters = {
    setProjectLead,
    setProjectManager,
    setWbsElementId,
    setName,
    setCrId,
    setStartDate,
    setDuration,
    setDependencies,
    setExpectedActivities,
    setDeliverables,
    setStatus,
    setProgress
  };

  const setField = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const transformUser = (user: string | undefined) => {
    if (userData) {
      const userId = userData.filter((rawUser) => fullNamePipe(rawUser) === user);
      return userId.length === 0 ? undefined : userId[0].userId;
    }
    return undefined;
  };

  const transformWbsNum = (wbsNum: WbsNumber) => {
    return {
      carNumber: wbsNum.car,
      projectNumber: wbsNum.project,
      workPackageNumber: wbsNum.workPackage
    };
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { userId } = auth.user!;

    // const payload = {
    //   projectLead: transformUser(projectLead),
    //   projectManager: transformUser(projectManager),
    //   wbsElementId: transformWbsNum(wbsNum),
    //   userId,
    //   name: name.trim(),
    //   crId,
    //   startDate.to,
    //   duration,
    //   dependencies: dependencies.map((dep) => {
    //     return {
    //       carNumber: dep.car,
    //       projectNumber: dep.project,
    //       workPackageNumber: dep.workPackage
    //     };
    //   }),
    //   expectedActivities,
    //   deliverables,
    //   wbsElementStatus: status,
    //   progress
    // };

    // await mutateAsync(payload);

    // after edit is complete, switch off edit mode
    setEditMode(false);
  };

  return (
    <div className="mb-5">
      {/* <Form onSubmit={handleSubmit}>
        <PageTitle title={`${wbsPipe(data.wbsElementId)} - ${data.name}`} />
        <WorkPackageButtons changeEditMode={() => setEditMode(true)} />
        <WorkPackageDetails details={details} setters={setters} />
        <DependenciesList dependencies={data.dependencies} setter={setters.setDependencies} />
        <PageBlock
          title="Expected Activities"
          headerRight={<></>}
          body={
            <EditableTextInputList
              readOnly={!editMode}
              items={ea.map((ea) => ea.detail)}
              add={expectedActivitiesUtil.add}
              remove={expectedActivitiesUtil.remove}
              update={expectedActivitiesUtil.update}
            />
          }
        />
        <PageBlock
          title={'Delieverables'}
          headerRight={<></>}
          body={
            <EditableTextInputList
              readOnly={!editMode}
              items={d.map((d) => d.detail)}
              add={deliverablesUtil.add}
              remove={deliverablesUtil.remove}
              update={deliverablesUtil.update}
            />
          }
        />
        <ChangesList changes={data.changes} />
        {editMode ? <EditModeOptions changeEditMode={() => setEditMode(false)} /> : ''}
      </Form> */}
    </div>
  );
};

export default WorkPackageContainerEdit;
