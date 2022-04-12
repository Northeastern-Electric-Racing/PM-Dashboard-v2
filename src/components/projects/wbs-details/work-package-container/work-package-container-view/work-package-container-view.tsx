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
import { FormContext } from '../work-package-container';

interface WorkPackageContainerProps {
  data: WorkPackage;
  editMode: boolean;
  setEditMode: any;
  handleSubmit: any;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({
  data,
  editMode,
  setEditMode,
  handleSubmit
}) => {
  const [expectedActivities, setExpectedActivities] = useState(
    data.expectedActivities.map((ea) => ea.detail)
  );
  const [deliverables, setDeliverables] = useState(data.deliverables.map((d) => d.detail));
  const { setField } = useContext(FormContext);

  // Refreshes data to original data when edit mode is canceled.
  useEffect(() => {
    setExpectedActivities(data.expectedActivities.map((ea) => ea.detail));
    setDeliverables(data.deliverables.map((d) => d.detail));
  }, [editMode, data]);

  // set field for expected activities
  useEffect(() => {
    setField('expectedActivities', expectedActivities);
  }, [expectedActivities, setField]);

  // set field for deliverables
  useEffect(() => {
    setField('deliverables', deliverables);
  }, [deliverables, setField]);

  const expectedActivitiesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = expectedActivities.slice();
      clone.push(val);
      setExpectedActivities(clone);
    },
    remove: (idx) => {
      const clone = expectedActivities.slice();
      clone.splice(idx, 1);
      setExpectedActivities(clone);
    },
    update: (idx, val) => {
      const clone = expectedActivities.slice();
      clone[idx] = val;
      setExpectedActivities(clone);
    }
  };

  const deliverablesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = deliverables.slice();
      clone.push(val);
      setDeliverables(clone);
    },
    remove: (idx) => {
      const clone = deliverables.slice();
      clone.splice(idx, 1);
      setDeliverables(clone);
    },
    update: (idx, val) => {
      const clone = deliverables.slice();
      clone[idx] = val;
      setDeliverables(clone);
    }
  };

  return (
    <div className="mb-5">
      <Form onSubmit={handleSubmit}>
        <PageTitle title={`${wbsPipe(data.wbsNum)} - ${data!.name}`} />
        <WorkPackageButtons changeEditMode={() => setEditMode(true)} />
        <WorkPackageDetails workPackage={data!} />
        <DependenciesList dependencies={data!.dependencies} />
        <PageBlock
          title="Expected Activities"
          headerRight={<></>}
          body={
            <EditableTextInputList
              readOnly={!editMode}
              items={expectedActivities}
              add={expectedActivitiesUtil.add}
              remove={expectedActivitiesUtil.remove}
              update={expectedActivitiesUtil.update}
            />
          }
        />
        <PageBlock
          title={'Delieverables'}
          headerRight={<></>}
          body={
            <EditableTextInputList
              readOnly={!editMode}
              items={deliverables}
              add={deliverablesUtil.add}
              remove={deliverablesUtil.remove}
              update={deliverablesUtil.update}
            />
          }
        />
        <ChangesList changes={data!.changes} />
        {editMode ? <EditModeOptions changeEditMode={() => setEditMode(false)} /> : ''}
      </Form>
    </div>
  );
};

export default WorkPackageContainer;
