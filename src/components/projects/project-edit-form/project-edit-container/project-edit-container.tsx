/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useState, useEffect } from 'react';
import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { Form } from 'react-bootstrap';
import { useSingleProject } from '../../../../services/projects.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import DescriptionList from '../../../shared/description-list/description-list';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import ProjectEditDetails from './project-edit-details/project-edit-details';
import EditModeOptions from './edit-mode-options/edit-mode-options';

export const FormContext = createContext({
  editMode: false,
  setField: (field: string, value: any) => {}
});

interface EditFormContainerProps {
  wbsNum: WbsNumber;
}

export interface EditModeProps {
  changeEditMode(arg: any): void;
}

const ProjectEditContainer: React.FC<EditFormContainerProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleProject(wbsNum);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [validated, setValidated] = useState(false);

  const setField = (field: string, value: any) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const value = { editMode, setField };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const handleSubmit = (event: SyntheticEvent) => {
    //event.preventDefault();
    const { currentTarget } = event;
    console.log(currentTarget);
  };

  return (
    <FormContext.Provider value={value}>
      <div className="mb-5">
        <Form onSubmit={handleSubmit}>
          <PageTitle title={`${wbsPipe(wbsNum)} - ${data!.name}`} />
          <ProjectEditDetails project={data!} />
          <DescriptionList title={'Goals'} items={data!.goals} />
          <DescriptionList title={'Features'} items={data!.features} />
          {editMode ? <EditModeOptions changeEditMode={() => setEditMode(false)} /> : ''}
        </Form>
      </div>
    </FormContext.Provider>
  );
};

export default ProjectEditContainer;
