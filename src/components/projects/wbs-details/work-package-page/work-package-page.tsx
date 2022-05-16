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
import WorkPackageContainerEdit from './work-package-edit-container/work-package-edit-container';
import WorkPackageContainerView from '../work-package-container/work-package-container-view/work-package-container-view';

interface WorkPackagePageProps {
  wbsNum: WbsNumber;
}

const WorkPackagePage: React.FC<WorkPackagePageProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState<boolean>(false);
  const auth = useAuth();
  const isGuest = auth.user?.role === 'GUEST';

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorPage message={error?.message} />;

  const wp = {
    ...data!,
    expectedActivities: data!.expectedActivities.filter((ea) => ea.dateDeleted === undefined),
    deliverables: data!.deliverables.filter((del) => del.dateDeleted === undefined)
  };

  if (editMode) {
    return <WorkPackageContainerEdit workPackage={wp} edit={{ editMode, setEditMode }} />;
  }

  return (
    <WorkPackageContainerView
      workPackage={wp}
      edit={{ editMode, setEditMode }}
      allowEdit={!isGuest}
      allowActivate={!isGuest}
      allowStageGate={!isGuest}
    />
  );
};

export default WorkPackagePage;
