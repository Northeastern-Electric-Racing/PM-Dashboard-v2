/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import WorkPackageDetails from './work-package-details/work-package-details';
import DependenciesList from './dependencies-list/dependencies-list';
import DescriptionList from './description-list/description-list';
import ChangesList from './changes-list/changes-list';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import './work-package-container.module.css';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <div className="mb-5">
      <PageTitle title={`${wbsPipe(wbsNum)} - ${data!.name}`} />
      <WorkPackageDetails workPackage={data!} />
      <DependenciesList dependencies={data!.dependencies} />
      <DescriptionList items={data!.expectedActivities} />
      <ChangesList changes={data!.changes} />
    </div>
  );
};

export default WorkPackageContainer;
