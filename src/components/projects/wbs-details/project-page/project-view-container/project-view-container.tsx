/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../../../../../shared/pipes';
import { useSingleProject } from '../../../../../services/projects.hooks';
import { useAuth } from '../../../../../services/auth.hooks';
import ChangesList from '../../work-package-container/work-package-container-view/changes-list/changes-list';
import LoadingIndicator from '../../../../shared/loading-indicator/loading-indicator';
import DescriptionList from '../../../../shared/description-list/description-list';
import WorkPackageSummary from './work-package-summary/work-package-summary';
import ProjectDetails from './project-details/project-details';
import ErrorPage from '../../../../shared/error-page/error-page';
import PageTitle from '../../../../shared/page-title/page-title';
import PageBlock from '../../../../shared/page-block/page-block';
import RulesList from './rules-list/rules-list';
import './project-view-container.module.css';

interface ProjectViewContainerProps {
  wbsNum: WbsNumber;
}

const ProjectViewContainer: React.FC<ProjectViewContainerProps> = ({ wbsNum }) => {
  const auth = useAuth();
  const { isLoading, isError, data, error } = useSingleProject(wbsNum);
  const [editMode, setEditMode] = useState<boolean>(false);

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorPage message={error?.message} />;

  const isGuest = auth.user?.role === 'GUEST';
  const editBtn = (
    <Dropdown.Item onClick={() => setEditMode(true)} disabled={isGuest}>
      Edit
    </Dropdown.Item>
  );
  const projectActionsDropdown = (
    <DropdownButton id="project-actions-dropdown" title="Actions">
      {!editMode ? editBtn : ''}
    </DropdownButton>
  );

  return (
    <div className="mb-5">
      <PageTitle
        title={`${wbsPipe(wbsNum)} - ${data!.name}`}
        actionButton={projectActionsDropdown}
      />
      <ProjectDetails project={data!} />
      <PageBlock title={'Summary'} headerRight={<></>} body={<>{data!.summary}</>} />
      <DescriptionList title={'Goals'} items={data!.goals.filter((goal) => !goal.dateDeleted)} />
      <DescriptionList
        title={'Features'}
        items={data!.features.filter((feature) => !feature.dateDeleted)}
      />
      <DescriptionList
        title={'Other Constraints'}
        items={data!.otherConstraints.filter((constraint) => !constraint.dateDeleted)}
      />
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
};

export default ProjectViewContainer;
