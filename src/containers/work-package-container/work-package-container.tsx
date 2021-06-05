/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber } from 'utils';
import { wbsPipe } from '../../shared/pipes';
import { useSingleWorkPackage } from '../../services/work-packages';
import WorkPackageDetails from '../../components/work-package-details/work-package-details';
import WorkPackageDependencies from '../../components/work-package-dependencies/work-package-dependencies';
import WorkPackageRules from '../../components/work-package-rules/work-package-rules';
import DescriptionList from '../../components/description-list/description-list';
import WorkPackageChanges from '../../components/work-package-changes/work-package-changes';
import './work-package-container.module.css';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const { isLoading, errorMessage, responseData } = useSingleWorkPackage(wbsNum);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (errorMessage !== '' || responseData === undefined) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{errorMessage ? errorMessage : 'The data did not load properly.'}</p>
      </>
    );
  }

  const cardPadding = 'px-4 py-2';
  return (
    <div className="mb-5">
      <div className="mx-5 pt-2 pb-1">
        <h3>
          {wbsPipe(wbsNum)} - {responseData.name}
        </h3>
      </div>
      <div className={cardPadding}>
        <WorkPackageDetails workPackage={responseData!} />
      </div>
      <div className={cardPadding}>
        <WorkPackageDependencies workPackage={responseData!} />
      </div>
      <div className={cardPadding}>
        <WorkPackageRules workPackage={responseData!} />
      </div>
      <div className={cardPadding}>
        <DescriptionList workPackage={responseData!} />
      </div>
      <div className={cardPadding}>
        <WorkPackageChanges workPackage={responseData!} />
      </div>
    </div>
  );
};

export default WorkPackageContainer;
