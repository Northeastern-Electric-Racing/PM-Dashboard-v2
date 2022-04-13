/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useState } from 'react';
import { validateWBS, WbsElementStatus, WbsNumber } from 'utils';
import { useEditWorkPackage, useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import WorkPackageContainerView from './work-package-container-view/work-package-container-view';
import { useAuth } from '../../../../services/auth.hooks';
import { useAllUsers } from '../../../../services/users.hooks';
import { datePipe, fullNamePipe, wbsPipe } from '../../../../shared/pipes';
import { useParams } from 'react-router-dom';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

interface FormFields {
  projectLead: string | undefined;
  projectManager: string | undefined;
  userId: number;
  name: string;
  crId: string;
  startDate: string;
  duration: string;
  dependencies: string[];
  expectedActivities: { id: number; detail: string }[];
  deliverables: { id: number; detail: string }[];
  status: WbsElementStatus;
  progress: string;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export const FormContext = createContext({
  editMode: false,
  setField: (field: string, value: any) => {}
});

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  interface ParamTypes {
    id: string;
  }
  const { id } = useParams<ParamTypes>();
  const auth = useAuth();
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<FormFields>({
    projectLead: undefined,
    projectManager: undefined,
    userId: 0,
    name: '',
    crId: '',
    startDate: '',
    duration: '',
    dependencies: [],
    expectedActivities: [],
    deliverables: [],
    status: WbsElementStatus.Inactive,
    progress: ''
  });
  const { mutateAsync } = useEditWorkPackage();
  const { data: userData } = useAllUsers();

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

  const transformWbsElemId = (id: string) => {
    return validateWBS(id);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { userId } = auth.user!;

    // need to transform wbselementid, get user ids of project lead and project manager
    // map on deps to get ids

    /**
     * projectLead?: number | undefined;
    projectManager?: number | undefined;
    wbsElementId: number;
    userId: number;
    name: string;
    crId: number;
    startDate: string;
    duration: number;
    dependencies: number[]; //wbs eleme ids
    expectedActivities: {
name, expectedActivities, deliverables, wbsElementStatus, progress
      
     */
    const payload = {
      projectLead: transformUser(form.projectLead),
      projectManager: transformUser(form.projectManager),
      wbsElementId: transformWbsElemId(id),
      userId,
      name: form.name.trim(),
      crId: parseInt(form.crId.trim()),
      startDate: form.startDate,
      duration: parseInt(form.duration.trim()),
      dependencies: form.dependencies.map((dep) => validateWBS(dep.trim())),
      expectedActivities: [{ id: 0, detail: 'asdf' }],
      deliverables: [{ id: 0, detail: 'asdf' }],
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

export default WorkPackageContainer;
