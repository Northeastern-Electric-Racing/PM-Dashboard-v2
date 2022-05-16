/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Dropdown, DropdownButton } from 'react-bootstrap';
import { WbsNumber, WorkPackage, Project } from 'utils';
import { wbsPipe } from '../../../../../shared/pipes';
import { useAuth } from '../../../../../services/auth.hooks';
import ChangesList from '../../work-package-container/work-package-container-view/changes-list/changes-list';
import DescriptionList from '../../../../shared/description-list/description-list';
import WorkPackageSummary from './work-package-summary/work-package-summary';
import ProjectDetails from './project-details/project-details';
import PageTitle from '../../../../shared/page-title/page-title';
import PageBlock from '../../../../shared/page-block/page-block';
import RulesList from './rules-list/rules-list';
import './project-view-container.module.css';

interface ProjectViewContainerProps {
  wbsNum: WbsNumber;
  proj: Project;
  enterEditMode: () => void;
}

const ProjectViewContainer: React.FC<ProjectViewContainerProps> = ({
  wbsNum,
  proj,
  enterEditMode
}) => {
  const auth = useAuth();

  const isGuest = auth.user?.role === 'GUEST';
  const editBtn = (
    <Dropdown.Item onClick={enterEditMode} disabled={isGuest}>
      Edit
    </Dropdown.Item>
  );
  const projectActionsDropdown = (
    <DropdownButton id="project-actions-dropdown" title="Actions">
      {editBtn}
    </DropdownButton>
  );

  return (
    <div className="mb-5">
      <PageTitle
        title={`${wbsPipe(proj.wbsNum)} - ${proj.name}`}
        actionButton={projectActionsDropdown}
      />
      <ProjectDetails project={proj} />
      <PageBlock title={'Summary'} headerRight={<></>} body={<>{proj.summary}</>} />
      <DescriptionList title={'Goals'} items={proj.goals.filter((goal) => !goal.dateDeleted)} />
      <DescriptionList
        title={'Features'}
        items={proj.features.filter((feature) => !feature.dateDeleted)}
      />
      <DescriptionList
        title={'Other Constraints'}
        items={proj.otherConstraints.filter((constraint) => !constraint.dateDeleted)}
      />
      <RulesList rules={proj.rules} />
      <ChangesList changes={proj.changes} />
      <PageBlock
        title={'Work Packages'}
        headerRight={<></>}
        body={
          <>
            {proj.workPackages.map((ele: WorkPackage) => (
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
