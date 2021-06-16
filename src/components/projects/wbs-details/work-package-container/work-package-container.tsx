/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import WorkPackageDetails from './work-package-details/work-package-details';
import WorkPackageDependencies from './work-package-dependencies/work-package-dependencies';
import WorkPackageRules from './work-package-rules/work-package-rules';
import DescriptionList from './description-list/description-list';
import WorkPackageChanges from './work-package-changes/work-package-changes';
import './work-package-container.module.css';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{error ? error.message : 'There was an error loading the data.'}</p>
      </>
    );
  }

  const cardPadding = 'px-4 py-2';
  return (
    <div className="mb-5">
      <div className="mx-5 pt-2 pb-1">
        <h3>
          {wbsPipe(wbsNum)} - {data!.name}
        </h3>
      </div>
      <div className={cardPadding}>
        <WorkPackageDetails workPackage={data!} />
      </div>
      <div className={cardPadding}>
        <WorkPackageDependencies workPackage={data!} />
      </div>
      <div className={cardPadding}>
        <WorkPackageRules workPackage={data!} />
      </div>
      <div className={cardPadding}>
        <DescriptionList workPackage={data!} />
      </div>
      <div className={cardPadding}>
        <WorkPackageChanges workPackage={data!} />
      </div>
    </div>
  );
};

export default WorkPackageContainer;
