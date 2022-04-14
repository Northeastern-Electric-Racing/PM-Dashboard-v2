/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useState } from 'react';
import { validateWBS, WbsElementStatus, WbsNumber, WorkPackage } from 'utils';
import { useEditWorkPackage, useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import WorkPackageContainerView from './work-package-container-view/work-package-container-view';
import { useAuth } from '../../../../services/auth.hooks';
import { useAllUsers } from '../../../../services/users.hooks';
import { datePipe, fullNamePipe, wbsPipe } from '../../../../shared/pipes';
import { useParams } from 'react-router-dom';

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

  // states for the form's payload
  const [projectLead, setProjectLead] = useState<string>(fullNamePipe(workPackage.projectLead));
  const [projectManager, setProjectManager] = useState<string>(
    fullNamePipe(workPackage.projectManager)
  );
  const [wbsElementId, setWbsElementId] = useState<WbsNumber>(workPackage.wbsNum);
  const [name, setName] = useState<string>(workPackage.name);
  const [crId, setCrId] = useState<number>();
  const [startDate, setStartDate] = useState<string>(datePipe(workPackage.startDate));
  const [duration, setDuration] = useState<number>(workPackage.duration);
  const [dependencies] = useState<WbsNumber[]>(workPackage.dependencies);
  const [expectedActivities, setExpectedActivities] = useState<
    { id: number | undefined; detail: string }[]
  >(
    workPackage.expectedActivities.map((ea) => ({
      id: ea.id,
      detail: ea.detail
    }))
  );
  const [deliverables, setDeliverables] = useState<{ id: number | undefined; detail: string }[]>(
    workPackage.deliverables.map((d) => ({
      id: d.id,
      detail: d.detail
    }))
  );

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

  const transformStatus = (status: string | undefined) => {
    switch (status) {
      case 'ACTIVE':
        return WbsElementStatus.Active;
      case 'INACTIVE':
        return WbsElementStatus.Inactive;
      default:
        return WbsElementStatus.Complete;
    }
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

    console.log(`${form.crId}, ${form.duration}, ${form.progress}`);
    const payload = {
      projectLead: transformUser(form.projectLead),
      projectManager: transformUser(form.projectManager),
      wbsElementId: transformWbsNum(wbsNum),
      userId,
      name: form.name.trim(),
      crId: parseInt(form.crId.trim()),
      startDate: form.startDate,
      duration: parseInt(form.duration.trim()),
      dependencies: form.dependencies.map((dep) => {
        const depWbsNum = validateWBS(dep.trim());
        return {
          carNumber: depWbsNum.car,
          projectNumber: depWbsNum.project,
          workPackageNumber: depWbsNum.workPackage
        };
      }),
      expectedActivities: form.expectedActivities,
      deliverables: form.deliverables,
      wbsElementStatus: transformStatus(form.status),
      progress: parseInt(form.progress)
    };

    await mutateAsync(payload);

    // after edit is complete, switch off edit mode
    setEditMode(false);
  };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <FormContext.Provider value={{ editMode, setField }}>
      <WorkPackageContainerView
        data={data!}
        editMode={editMode}
        setEditMode={(mode: boolean) => setEditMode(mode)}
        handleSubmit={(event: SyntheticEvent) => handleSubmit(event)}
      />
    </FormContext.Provider>
  );
};

export default WorkPackageContainerEdit;
