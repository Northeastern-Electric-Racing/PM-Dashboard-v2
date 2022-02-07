/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from "react";
import { useHistory } from "react-router-dom";
import CreateWPFormView from "./create-wp-form/create-wp-form";

export interface EditableTextInputListUtils {
  add: (val: any) => any;
  remove: (idx: number) => any;
  update: (idx: number, val: any) => any;
}

const CreateWPForm: React.FC = () => {
  const history = useHistory();

  const [dependencies, setDependencies] = useState<string[]>(['']);
  const [expectedActivities, setExpectedActivities] = useState<string[]>(['']);
  const [deliverables, setDeliverables] = useState<string[]>(['']);

  const depUtils: EditableTextInputListUtils = {
    add: (val: any) => {
      const clone = dependencies.slice();
      clone.push(val);
      setDependencies(clone);
    },
    remove: (idx: number) => {
      const clone = dependencies.slice();
      clone.splice(idx, 1);
      setDependencies(clone);
    },
    update: (idx: number, val: any) => {
      const clone = dependencies.slice();
      clone[idx] = val;
      setDependencies(clone);
    }
  };

  const eaUtils: EditableTextInputListUtils = {
    add: (val: any) => {
      const clone = expectedActivities.slice();
      clone.push(val);
      setExpectedActivities(clone);
    },
    remove: (idx: number) => {
      const clone = expectedActivities.slice();
      clone.splice(idx, 1);
      setExpectedActivities(clone);
    },
    update: (idx: number, val: any) => {
      const clone = expectedActivities.slice();
      clone[idx] = val;
      setExpectedActivities(clone);
    }
  };

  const delUtils: EditableTextInputListUtils = {
    add: (val: any) => {
      const clone = deliverables.slice();
      clone.push(val);
      setDeliverables(clone);
    },
    remove: (idx: number) => {
      const clone = deliverables.slice();
      clone.splice(idx, 1);
      setDeliverables(clone);
    },
    update: (idx: number, val: any) => {
      const clone = deliverables.slice();
      clone[idx] = val;
      setDeliverables(clone);
    }
  };

  return (
    <CreateWPFormView
      dependencies={dependencies}
      depUtils={depUtils}
      expectedActivities={expectedActivities}
      eaUtils={eaUtils}
      deliverables={deliverables}
      delUtils={delUtils}
      onSubmit={() => alert('submitted')}
      onCancel={() => history.goBack()}
    />
  );
};

export default CreateWPForm;
