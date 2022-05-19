/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { WbsElementStatus, WorkPackage } from 'utils';
import { wbsPipe } from '../../../../../shared/pipes';
import ActivateWorkPackageModalContainer from '../activate-work-package-modal-container/activate-work-package-modal-container';
import DescriptionList from '../../../../shared/description-list/description-list';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import WorkPackageDetails from './work-package-details/work-package-details';
import ChangesList from '../../../../shared/changes-list/changes-list';
import PageTitle from '../../../../shared/page-title/page-title';
import StageGateWorkPackageModalContainer from '../stage-gate-work-package-modal-container/stage-gate-work-package-modal-container';

interface WorkPackageViewContainerProps {
  workPackage: WorkPackage;
  enterEditMode: () => void;
  allowEdit: boolean;
  allowActivate: boolean;
  allowStageGate: boolean;
}

const WorkPackageViewContainer: React.FC<WorkPackageViewContainerProps> = ({
  workPackage,
  enterEditMode,
  allowEdit,
  allowActivate,
  allowStageGate
}) => {
  const [showActivateModal, setShowActivateModal] = useState<boolean>(false);
  const [showStageGateModal, setShowStageGateModal] = useState<boolean>(false);

  const editBtn = (
    <Dropdown.Item as={Button} onClick={enterEditMode} disabled={!allowEdit}>
      Edit
    </Dropdown.Item>
  );
  const activateBtn = (
    <Dropdown.Item as={Button} onClick={() => setShowActivateModal(true)} disabled={!allowActivate}>
      Activate
    </Dropdown.Item>
  );
  const stageGateBtn = (
    <Dropdown.Item
      as={Button}
      onClick={() => setShowStageGateModal(true)}
      disabled={!allowStageGate}
    >
      Stage Gate
    </Dropdown.Item>
  );
  const projectActionsDropdown = (
    <DropdownButton id="work-package-actions-dropdown" title="Actions">
      {editBtn}
      {workPackage.status === WbsElementStatus.Inactive ? activateBtn : ''}
      {workPackage.status === WbsElementStatus.Active ? stageGateBtn : ''}
    </DropdownButton>
  );

  return (
    <div className="mb-5">
      <PageTitle
        title={`${wbsPipe(workPackage.wbsNum)} - ${workPackage.name}`}
        actionButton={projectActionsDropdown}
      />
      <WorkPackageDetails workPackage={workPackage} />
      <HorizontalList
        title={'Dependencies'}
        headerRight={<></>}
        items={workPackage.dependencies.map((dep) => (
          <strong>{wbsPipe(dep)}</strong>
        ))}
      />
      <DescriptionList
        title={'Expected Activities'}
        items={workPackage.expectedActivities.filter((ea) => ea.dateDeleted === undefined)}
      />
      <DescriptionList
        title={'Deliverables'}
        items={workPackage.deliverables.filter((del) => del.dateDeleted === undefined)}
      />
      <ChangesList changes={workPackage.changes} />
      {showActivateModal && (
        <ActivateWorkPackageModalContainer
          wbsNum={workPackage.wbsNum}
          modalShow={showActivateModal}
          handleClose={() => setShowActivateModal(false)}
        />
      )}
      {showStageGateModal && (
        <StageGateWorkPackageModalContainer
          wbsNum={workPackage.wbsNum}
          modalShow={showStageGateModal}
          handleClose={() => setShowStageGateModal(false)}
        />
      )}
    </div>
  );
};

export default WorkPackageViewContainer;
