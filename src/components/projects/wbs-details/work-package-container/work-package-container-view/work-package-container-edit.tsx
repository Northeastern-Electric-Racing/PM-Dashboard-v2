/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { data } from 'msw/lib/types/context';
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
import { EditMode } from '../work-package-container';
import ChangesList from './changes-list/changes-list';
import DependenciesList from './dependencies-list/dependencies-list';
import EditModeOptions from './edit-mode-options/edit-mode-options';
import WorkPackageButtons from './work-package-buttons/work-package-buttons';
import WorkPackageDetails from './work-package-details/work-package-details';
import WorkPackageEditDetails from './work-package-edit-details/work-package-edit-details';

interface WorkPackageContainerEditProps {
  workPackage: WorkPackage;
  edit: EditMode;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export const FormContext = createContext({
  editMode: false,
  setField: (field: string, value: any) => {}
});

const WorkPackageContainerEdit: React.FC<WorkPackageContainerEditProps> = ({
  workPackage,
  edit
}) => {
  const auth = useAuth();
  const { mutateAsync } = useEditWorkPackage();
  const { data: userData } = useAllUsers();

  // states for the form's payload
  const [projectLead, setProjectLead] = useState<string>(fullNamePipe(workPackage.projectLead));
  const [projectManager, setProjectManager] = useState<string>(
    fullNamePipe(workPackage.projectManager)
  );
  const [name, setName] = useState<string>(workPackage.name);
  const [crId, setCrId] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(workPackage.startDate);
  const [duration, setDuration] = useState<number>(workPackage.duration);
  const [deps, setDeps] = useState<WbsNumber[]>(workPackage.dependencies);
  const [ea, setEa] = useState<{ id: number; detail: string }[]>(
    workPackage.expectedActivities.map((ea) => ({
      id: ea.id,
      detail: ea.detail
    }))
  );
  const [dels, setDels] = useState<{ id: number; detail: string }[]>(
    workPackage.deliverables.map((d) => ({
      id: d.id,
      detail: d.detail
    }))
  );
  const [status, setStatus] = useState<WbsElementStatus>(workPackage.status);
  const [progress, setProgress] = useState<number>(workPackage.progress);

  const expectedActivitiesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = ea.slice();
      clone.push({
        id: -1,
        detail: val
      });
      setEa(clone);
    },
    remove: (idx) => {
      const clone = ea.slice();
      clone.splice(idx, 1);
      setEa(clone);
    },
    update: (idx, val) => {
      const clone = ea.slice();
      clone[idx].detail = val;
      setEa(clone);
    }
  };

  const deliverablesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = dels.slice();
      clone.push({
        id: -1,
        detail: val
      });
      setDels(clone);
    },
    remove: (idx) => {
      const clone = dels.slice();
      clone.splice(idx, 1);
      setDels(clone);
    },
    update: (idx, val) => {
      const clone = dels.slice();
      clone[idx].detail = val;
      setDels(clone);
    }
  };

  const setters = {
    setProjectLead,
    setProjectManager,
    setName,
    setCrId,
    setStartDate,
    setDuration,
    setDeps,
    setEa,
    setDels,
    setStatus,
    setProgress
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

    const payload = {
      projectLead: transformUser(projectLead),
      projectManager: transformUser(projectManager),
      wbsElementId: transformWbsNum(workPackage.wbsNum),
      userId,
      name,
      crId: parseInt(crId),
      startDate: startDate.toLocaleString(),
      duration,
      dependencies: deps.map((dep) => transformWbsNum(dep)),
      expectedActivities: ea,
      deliverables: dels,
      wbsElementStatus: status,
      progress
    };

    console.log(payload);

    //await mutateAsync(payload);

    // after edit is complete, switch off edit mode
    edit.setEditMode(false);
  };

  return (
    <div className="mb-5">
      <Form onSubmit={handleSubmit}>
        <PageTitle title={`${wbsPipe(workPackage.wbsNum)} - ${workPackage.name}`} />
        <Form.Control
          className="m-4 w-25"
          type="number"
          placeholder="Change Request ID #"
          min="0"
          required
          onChange={(e) => setCrId(e.target.value.trim())}
        />
        <WorkPackageEditDetails workPackage={workPackage} users={userData!} setters={setters} />
        <DependenciesList dependencies={workPackage.dependencies} setter={setDeps} />
        <PageBlock
          title="Expected Activities"
          headerRight={<></>}
          body={
            <EditableTextInputList
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
              items={dels.map((d) => d.detail)}
              add={deliverablesUtil.add}
              remove={deliverablesUtil.remove}
              update={deliverablesUtil.update}
            />
          }
        />
        <EditModeOptions setEditMode={edit.setEditMode} />
      </Form>
    </div>
  );
};

export default WorkPackageContainerEdit;
