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
import WorkPackageContainerView from './work-package-container-view/work-package-container-view';
import WorkPackageContainerEdit from './work-package-container-view/work-package-container-edit';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export interface EditMode {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
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
  return editMode ? (
    <WorkPackageContainerEdit workPackage={wp} edit={{ editMode, setEditMode }} />
  ) : (
    <WorkPackageContainerView
      workPackage={wp}
      edit={{ editMode, setEditMode }}
      allowEdit={!isGuest}
      allowActivate={!isGuest}
      allowStageGate={!isGuest}
    />
  );
};

export default WorkPackageContainer;
