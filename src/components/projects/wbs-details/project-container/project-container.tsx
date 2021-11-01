/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber, WorkPackageSummary as WorkPackageSum } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useSingleProject } from '../../../../services/projects.hooks';
import ProjectDetails from './project-details/project-details';
import WorkPackageSummary from './work-package-summary/work-package-summary';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import DescriptionList from '../../../shared/description-list/description-list';
import ChangesList from '../work-package-container/changes-list/changes-list';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import PageBlock from '../../../shared/page-block/page-block';
import RulesList from './rules-list/rules-list';
import './project-container.module.css';

interface ProjectContainerProps {
  wbsNum: WbsNumber;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ wbsNum }: ProjectContainerProps) => {
  const { isLoading, isError, data, error } = useSingleProject(wbsNum);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <div className="mb-5">
      <PageTitle title={`${wbsPipe(wbsNum)} - ${data!.name}`} />
      <ProjectDetails project={data!} />
      <DescriptionList title={'Goals'} items={data!.goals} />
      <DescriptionList title={'Features'} items={data!.features} />
      <DescriptionList title={'Other Constraints'} items={data!.otherConstraints} />
      <RulesList rules={data!.rules} />
      <ChangesList changes={data!.changes} />
      <PageBlock
        title={'Work Packages'}
        headerRight={<></>}
        body={
          <>
            {data!.workPackages.map((ele: WorkPackageSum) => (
              <div key={wbsPipe(ele.wbsNum)} className="mt-3">
                <WorkPackageSummary workPackage={ele} />
              </div>
            ))}
          </>
        }
      />
    </div>
  );
};

export default ProjectContainer;
