/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber, WorkPackage } from 'utils';
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
import { useState } from 'react';
import ProjectEditButton from './project-edit-button/project-edit-button';
import ProjectEditContainer from '../../project-edit-form/project-edit-container/project-edit-container';

interface ProjectContainerProps {
  wbsNum: WbsNumber;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ wbsNum }: ProjectContainerProps) => {
  const { isLoading, isError, data, error } = useSingleProject(wbsNum);
  const [editMode, setEditMode] = useState(false);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const readOnlyView = (
    <div className="mb-5">
      <PageTitle
        title={`${wbsPipe(wbsNum)} - ${data!.name}`}
        actionButton={editMode ? <></> : <ProjectEditButton setEditMode={setEditMode} />}
      />
      <ProjectDetails project={data!} />
      <PageBlock title={'Summary'} headerRight={<></>} body={<>{data!.summary}</>} />
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
            {data!.workPackages.map((ele: WorkPackage) => (
              <div key={wbsPipe(ele.wbsNum)} className="mt-3">
                <WorkPackageSummary workPackage={ele} />
              </div>
            ))}
          </>
        }
      />
    </div>
  );

  const editView = <ProjectEditContainer wbsNum={wbsNum} data={data!} setEditMode={setEditMode} />;

  return <>{editMode ? editView : readOnlyView}</>;
};

export default ProjectContainer;
