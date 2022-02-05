/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from "react";
import { useHistory } from "react-router-dom";
import CreateWPFormView from "./create-wp-form/create-wp-form";

const CreateWPForm: React.FC = () => {
  const history = useHistory();

  const [dependencies, setDependencies] = useState([]);
  const [expectedActivities, setExpectedActivities] = useState([]);
  const [deliverables, setDeliverables] = useState([]);

  return (
    <CreateWPFormView
      dependencies={dependencies}
      expectedActivites={expectedActivities}
      deliverables={deliverables}
      onSubmit={() => alert('submitted')}
      onCancel={() => history.goBack()}
    />
  );
};

export default CreateWPForm;
