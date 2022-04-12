/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useState } from 'react';
import { WbsElementStatus, WbsNumber } from 'utils';
import { useEditWorkPackage, useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import WorkPackageContainerView from './work-package-container-view/work-package-container-view';
import { useAuth } from '../../../../services/auth.hooks';
import { useAllUsers } from '../../../../services/users.hooks';
import { fullNamePipe } from '../../../../shared/pipes';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export const FormContext = createContext({
  editMode: false,
  setField: (field: string, value: any) => {}
});

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const auth = useAuth();
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const { mutateAsync } = useEditWorkPackage();
  const { data: userData } = useAllUsers();

  const setField = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const transformUser = (user: string) => {
    if (userData) {
      const userId = userData.filter((rawUser) => fullNamePipe(rawUser) === user);
      return userId.length === 0 ? undefined : userId[0].userId;
    }
    return undefined;
  };

  const transformStatus = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return WbsElementStatus.Active;
      case 'INACTIVE':
        return WbsElementStatus.Inactive;
      case 'COMPLETE':
        return WbsElementStatus.Complete;
    }
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
      wbsElementId: 0,
      userId,
      name: 'asdf',
      crId: 0,
      startDate: 'asdf',
      duration: 1,
      dependencies: [1],
      expectedActivities: [{ id: 0, detail: 'asdf' }],
      deliverables: [{ id: 0, detail: 'asdf' }],
      wbsElementStatus: transformStatus(form.status),
      progress: 1
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
