/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, useState } from 'react';
import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import DescriptionList from '../../../shared/description-list/description-list';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import WorkPackageButtons from './work-package-buttons/work-package-buttons';
import WorkPackageDetails from './work-package-details/work-package-details';
import DependenciesList from './dependencies-list/dependencies-list';
import ChangesList from './changes-list/changes-list';
import EditModeOptions from './edit-mode-options/edit-mode-options';

export const EditModeContext = createContext(false);

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState(false);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <EditModeContext.Provider value={editMode}>
      <div>
        <PageTitle title={`${wbsPipe(wbsNum)} - ${data!.name}`} />
        <WorkPackageButtons changeEditMode={() => setEditMode(true)} />
        <WorkPackageDetails workPackage={data!} />
        <DependenciesList dependencies={data!.dependencies} />
        <DescriptionList title={'Expected Activities'} items={data!.expectedActivities} />
        <DescriptionList title={'Deliverables'} items={data!.deliverables} />
        <ChangesList changes={data!.changes} />
        {editMode ? <EditModeOptions changeEditMode={() => setEditMode(false)} /> : ''}
      </div>
    </EditModeContext.Provider>
  );
};

export default WorkPackageContainer;
