/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useState } from 'react';
import { WbsNumber } from 'utils';
import { useSingleWorkPackage } from '../../../../services/work-packages.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import WorkPackageContainerView from './work-package-container-view/work-package-container-view';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

// Making this an object. Later on more functions can be used that can pass up state from inputs for wiring and such.
export const FormContext = createContext({
  editMode: false,
  setField: (field: string, value: any) => {}
});

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleWorkPackage(wbsNum);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  const setField = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Submitting...');
  };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <FormContext.Provider value={{ editMode, setField }}>
      <WorkPackageContainerView
        data={data!}
        editMode={editMode}
        setEditMode={(mode: boolean) => setEditMode(mode)}
        handleSubmit={(event: SyntheticEvent) => handleSubmit(event)}
      />
    </FormContext.Provider>
  );
};

export default WorkPackageContainer;
