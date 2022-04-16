/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { WorkPackage } from 'utils';
import { wbsPipe } from '../../../../../shared/pipes';
import { EditableTextInputListUtils } from '../../../create-wp-form/create-wp-form';
import EditableTextInputList from '../../../../shared/editable-text-input-list/editable-text-input-list';
import PageTitle from '../../../../shared/page-title/page-title';
import WorkPackageButtons from './work-package-buttons/work-package-buttons';
import WorkPackageDetails from './work-package-details/work-package-details';
import DependenciesList from './dependencies-list/dependencies-list';
import ChangesList from './changes-list/changes-list';
import EditModeOptions from './edit-mode-options/edit-mode-options';
import PageBlock from '../../../../shared/page-block/page-block';
import { EditModeContext, FormContext } from '../work-package-container';
import DescriptionList from '../../../../shared/description-list/description-list';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';

interface WorkPackageContainerProps {
  workPackage: WorkPackage;
  data: any;
  setters: any;
  handleSubmit: any;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const WorkPackageContainerView: React.FC<WorkPackageContainerProps> = ({
  workPackage
  data,
  setters,
  handleSubmit
}) => {
  const [ea, setEa] = useState<{ id: number | undefined; detail: string }[]>(
    data.expectedActivities
  );
  const [d, setD] = useState<{ id: number | undefined; detail: string }[]>(data.deliverables);
  const { editMode, setEditMode } = useContext(EditModeContext);

  // Refreshes data to original data when edit mode is canceled.
  useEffect(() => {
    setEa(data.expectedActivities);
    setD(data.deliverables);
  }, [editMode, data]);

  // set field for expected activities
  useEffect(() => {
    setters.setExpectedActivities(d);
  }, [ea]);

  // set field for deliverables
  useEffect(() => {
    setters.setDeliverables(d);
  }, [d]);

  const expectedActivitiesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = ea.slice();
      clone.push({
        id: undefined,
        detail: val
      });
      setEa(clone);
    },
    remove: (idx) => {
      const clone = ea.slice();
      clone.splice(idx, 1);
      setEa(clone);
    },
    update: (idx, val) => {
      const clone = ea.slice();
      clone[idx].detail = val;
      setEa(clone);
    }
  };

  const deliverablesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = d.slice();
      clone.push({
        id: undefined,
        detail: val
      });
      setD(clone);
    },
    remove: (idx) => {
      const clone = d.slice();
      clone.splice(idx, 1);
      setD(clone);
    },
    update: (idx, val) => {
      const clone = d.slice();
      clone[idx].detail = val;
      setD(clone);
    }
  };

  const details = {
    ...data
  };

  return (
    <div className="mb-5">
        <PageTitle title={`${wbsPipe(data.wbsElementId)} - ${data.name}`}
        actionButton={editMode ? <></> : <WorkPackageButtons setEditMode={setEditMode} />} />
        <WorkPackageDetails workPackage={data} />
        <HorizontalList title={'Dependencies'} headerRight={<></>} items={workPackage.dependencies.map(dep => <b>{dep}</b>)} />
        <DescriptionList title={'Expected Activities'} items={workPackage.expectedActivities} />
        <DescriptionList title={'Deliverables'} items={workPackage.deliverables} />
        <ChangesList changes={data.changes} />
        {editMode ? <EditModeOptions changeEditMode={() => setEditMode(false)} /> : ''}
  </div>
  );
};

export default WorkPackageContainerView;
