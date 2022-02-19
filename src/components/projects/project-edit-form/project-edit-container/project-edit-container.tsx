/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, SyntheticEvent, useState, useEffect } from 'react';
import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { Form, Row } from 'react-bootstrap';
import { useSingleProject } from '../../../../services/projects.hooks';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import DescriptionList from '../../../shared/description-list/description-list';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import EditableTextInputList from '../../../shared/editable-text-input-list/editable-text-input-list';
import { EditableTextInputListUtils } from '../../create-wp-form/create-wp-form';
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

  const [goals, setGoals] = useState(data!.goals);
  const [features, setFeatures] = useState(data!.features);
  const [otherConstraints, setOther] = useState(data!.otherConstraints);
  const [rules, setRules] = useState(data!.rules);

  const goalsUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = goals.slice();
      clone.push(val);
      setGoals(clone);
    },
    remove: (idx) => {
      const clone = goals.slice();
      clone.splice(idx, 1);
      setGoals(clone);
    },
    update: (idx, val) => {
      const clone = goals.slice();
      clone[idx] = val;
      setGoals(clone);
    }
  };
  const featUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = features.slice();
      clone.push(val);
      setFeatures(clone);
    },
    remove: (idx) => {
      const clone = features.slice();
      clone.splice(idx, 1);
      setFeatures(clone);
    },
    update: (idx, val) => {
      const clone = features.slice();
      clone[idx] = val;
      setFeatures(clone);
    }
  };
  const othCUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = otherConstraints.slice();
      clone.push(val);
      setOther(clone);
    },
    remove: (idx) => {
      const clone = otherConstraints.slice();
      clone.splice(idx, 1);
      setOther(clone);
    },
    update: (idx, val) => {
      const clone = otherConstraints.slice();
      clone[idx] = val;
      setOther(clone);
    }
  };
  const rulesUtil: EditableTextInputListUtils = {
    add: (val) => {
      const clone = rules.slice();
      clone.push(val);
      setRules(clone);
    },
    remove: (idx) => {
      const clone = rules.slice();
      clone.splice(idx, 1);
      setRules(clone);
    },
    update: (idx, val) => {
      const clone = rules.slice();
      clone[idx] = val;
      setRules(clone);
    }
  };

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
          <Row>
            <Form.Group>
              <Form.Label htmlFor="goals-text-input-list">Goals</Form.Label>
              <Form.Group id="goals-text-input-list">
                <EditableTextInputList
                  items={goals}
                  add={goalsUtil.add}
                  remove={goalsUtil.remove}
                  update={goalsUtil.update}
                />
              </Form.Group>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label htmlFor="features-text-input-list">Features</Form.Label>
              <Form.Group id="features-text-input-list">
                <EditableTextInputList
                  items={features}
                  add={featUtil.add}
                  remove={featUtil.remove}
                  update={featUtil.update}
                />
              </Form.Group>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label htmlFor="other-text-input-list">Other Constraints</Form.Label>
              <Form.Group id="other-text-input-list">
                <EditableTextInputList
                  items={otherConstraints}
                  add={othCUtil.add}
                  remove={othCUtil.remove}
                  update={othCUtil.update}
                />
              </Form.Group>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label htmlFor="rules-text-input-list">Rules</Form.Label>
              <Form.Group id="rules-text-input-list">
                <EditableTextInputList
                  items={otherConstraints}
                  add={othCUtil.add}
                  remove={othCUtil.remove}
                  update={othCUtil.update}
                />
              </Form.Group>
            </Form.Group>
          </Row>
          {editMode ? <EditModeOptions changeEditMode={() => setEditMode(false)} /> : ''}
        </Form>
      </div>
    </FormContext.Provider>
  );
};

export default ProjectEditContainer;
