/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { WorkPackage } from 'utils';
import { wbsPipe } from '../../../../../shared/pipes';
import DescriptionList from '../../../../shared/description-list/description-list';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import PageTitle from '../../../../shared/page-title/page-title';
import { EditModeContext } from '../work-package-container';
import ChangesList from './changes-list/changes-list';
import WorkPackageButtons from './work-package-buttons/work-package-buttons';
import WorkPackageDetails from './work-package-details/work-package-details';

interface Props {
  workPackage: WorkPackage;
}

const WorkPackageContainerView: React.FC<Props> = ({ workPackage }) => {
  const { editMode, setEditMode } = useContext(EditModeContext);

  return (
    <div className="mb-5">
      <PageTitle
        title={`${wbsPipe(workPackage.wbsNum)} - ${workPackage.name}`}
        actionButton={editMode ? <></> : <WorkPackageButtons setEditMode={setEditMode} />}
      />
      <WorkPackageDetails workPackage={workPackage} />
      <HorizontalList
        title={'Dependencies'}
        headerRight={<></>}
        items={workPackage.dependencies.map((dep) => (
          <b>{dep}</b>
        ))}
      />
      <DescriptionList title={'Expected Activities'} items={workPackage.expectedActivities} />
      <DescriptionList title={'Deliverables'} items={workPackage.deliverables} />
      <ChangesList changes={workPackage.changes} />
    </div>
  );
};

export default WorkPackageContainerView;
