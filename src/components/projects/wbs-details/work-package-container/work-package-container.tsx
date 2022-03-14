/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useState } from 'react';
import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import { Form } from 'react-bootstrap';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import WorkPackageButtons from './work-package-buttons/work-package-buttons';
import WorkPackageDetails from './work-package-details/work-package-details';
import DependenciesList from './dependencies-list/dependencies-list';
import ChangesList from './changes-list/changes-list';
import EditModeOptions from './edit-mode-options/edit-mode-options';
import EditableTextInputList from '../../../shared/editable-text-input-list/editable-text-input-list';
import { EditableTextInputListUtils } from '../../create-wp-form/create-wp-form';

export const FormContext = createContext({
  editMode: false,
  setField: (field: string, value: any) => {}
});

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [expectedActivities, setExpectedActivities] = useState(['']);
  // This // data!.expectedActivities.map((expectedActivity) => expectedActivity.detail)
  const [deliverables, setDeliverables] = useState(['']);
  //   data!.deliverables.map((deliverable) => deliverable.detail)  And this are making issues.

  console.log(data!.expectedActivities);
  console.log(data!.deliverables);

  // This might not be needed anymore. Will be looked into!
  const setField = (field: string, value: any) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const value = { editMode, setField };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const handleSubmit = (event: SyntheticEvent) => {
    if (form.hasOwnProperty('')) {
    }
    event.preventDefault();
  };

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
    <FormContext.Provider value={value}>
      <div className="mb-5">
        <Form onSubmit={handleSubmit}>
          <PageTitle title={`${wbsPipe(wbsNum)} - ${data!.name}`} />
          <WorkPackageButtons changeEditMode={() => setEditMode(true)} />
          <WorkPackageDetails workPackage={data!} />
          <DependenciesList dependencies={data!.dependencies} />
          <EditableTextInputList
            title={'Expected Activities'}
            readOnly={!editMode}
            items={expectedActivities}
            add={expectedActivitiesUtil.add}
            remove={expectedActivitiesUtil.remove}
            update={expectedActivitiesUtil.update}
          />
          <EditableTextInputList
            title={'Deliverables'}
            readOnly={!editMode}
            items={deliverables}
            add={deliverablesUtil.add}
            remove={deliverablesUtil.remove}
            update={deliverablesUtil.update}
          />
          <ChangesList changes={data!.changes} />
          {editMode ? <EditModeOptions changeEditMode={() => setEditMode(false)} /> : ''}
        </Form>
      </div>
    </FormContext.Provider>
  );
};

export default WorkPackageContainer;
