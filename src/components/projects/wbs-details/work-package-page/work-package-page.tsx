/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { WbsNumber } from 'utils';
import { useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import { useAuth } from '../../../../services/auth.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import WorkPackageEditContainer from './work-package-edit-container/work-package-edit-container';
import WorkPackageViewContainer from './work-package-view-container/work-package-view-container';
import './work-package-page.module.css';

interface WorkPackagePageProps {
  wbsNum: WbsNumber;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export interface EditMode {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkPackagePage: React.FC<WorkPackagePageProps> = ({ wbsNum }) => {
  const auth = useAuth();
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState<boolean>(false);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const wp = {
    ...data!,
    expectedActivities: data!.expectedActivities.filter((ea) => ea.dateDeleted === undefined),
    deliverables: data!.deliverables.filter((del) => del.dateDeleted === undefined)
  };

  const isGuest = auth.user?.role === 'GUEST';

  if (editMode) {
    return <WorkPackageEditContainer workPackage={wp} edit={{ editMode, setEditMode }} />;
  }

  return (
    <WorkPackageViewContainer
      workPackage={wp}
      edit={{ editMode, setEditMode }}
      allowEdit={!isGuest}
      allowActivate={!isGuest}
      allowStageGate={!isGuest}
    />
  );
};

export default WorkPackagePage;
