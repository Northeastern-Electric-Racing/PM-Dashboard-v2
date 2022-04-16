/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useContext, useMemo, useState } from 'react';
import { validateWBS, WbsElementStatus, WbsNumber } from 'utils';
import { useEditWorkPackage, useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import WorkPackageContainerView from './work-package-container-view/work-package-container-view';
import { useAuth } from '../../../../services/auth.hooks';
import { useAllUsers } from '../../../../services/users.hooks';
import { datePipe, fullNamePipe, wbsPipe } from '../../../../shared/pipes';
import { useParams } from 'react-router-dom';
import WorkPackageContainerEdit from './work-package-container-view/work-package-container-edit';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export const EditModeContext = createContext<{
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  editMode: false,
  setEditMode: () => null
});

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      editMode,
      setEditMode
    }),
    [editMode]
  );

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <EditModeContext.Provider value={value}>
      {editMode ? (
        <WorkPackageContainerEdit wbsNum={wbsNum} workPackage={data!} />
      ) : (
        <WorkPackageContainerView workPackage={data!} />
      )}
    </EditModeContext.Provider>
  );
};

export default WorkPackageContainer;
