/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { isProject, Project, validateWBS, WbsNumber } from "utils";
import { getSingleProject } from "../../../services/projects.api";
import { getSingleWorkPackage } from "../../../services/work-packages.api";
import { useCreateSingleWorkPackage } from "../../../services/work-packages.hooks";
import { routes } from "../../../shared/routes";
import { AuthContext } from "../../app/app-context-auth/app-context-auth";
import CreateWPFormView from "./create-wp-form/create-wp-form";

export interface EditableTextInputListUtils {
  add: (val: any) => void;
  remove: (idx: number) => void;
  update: (idx: number, val: any) => void;
}

const CreateWPForm: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [dependencies, setDependencies] = useState<string[]>([]);
  const [expectedActivities, setExpectedActivities] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const { isLoading, isError, error, mutateAsync } = useCreateSingleWorkPackage();

  const depUtils: EditableTextInputListUtils = {
    add: (val) => {
      const clone = dependencies.slice();
      clone.push(val);
      setDependencies(clone);
    },
    remove: (idx) => {
      const clone = dependencies.slice();
      clone.splice(idx, 1);
      setDependencies(clone);
    },
    update: (idx, val) => {
      const clone = dependencies.slice();
      clone[idx] = val;
      setDependencies(clone);
    }
  };

  const eaUtils: EditableTextInputListUtils = {
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

  const delUtils: EditableTextInputListUtils = {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { target } = e;
    const { name, wbsNum: projectWbsNum, crId, startDate, duration } = target;
    console.log('aaaaaaaaa');
    // exits handleSubmit if form input invalid (should be changed in wire up)
    let wbsNum: WbsNumber;
    try {
      wbsNum = validateWBS(projectWbsNum.value.trim());
    } catch (e) {
      console.log(e);
      console.log('wbs num not valid');
    }
    console.log('bbbbbb');
    // this form can only be accessed if user is authenticated, so it is safe
    // to declare authContext and user is not undefinted

    const { userId } = authContext!.user!;

    console.log('cccc');
    // project id
    const data: Project | null = await getSingleProject(wbsNum!).
      then(res => {
        return res.data;
      }).catch(e => {
        console.log(e);
        console.log('project id fetch failed');
        return null;
      });
    console.log('ddddd');
    const { id: projectId } = data!;

    if (!isProject(wbsNum!)) {
      alert('Please enter a valid Project WBS Number.');
      return;
    }
    console.log('ee');
    const depWbsNums: WbsNumber[] = dependencies.map(dependency => {
      return validateWBS(dependency.trim());
    });
    console.log('f');
    const wbsElementIds: number[] = await Promise.all(
      depWbsNums.map(async (wbsNum) => {
        return (await getSingleWorkPackage(wbsNum)).data.id;
      })
    ).then((res) => res).catch(err => { throw err });
    console.log('g');
    if (wbsElementIds) {
      await mutateAsync({
        userId,
        name: name.value.trim(),
        crId: crId.value,
        projectId,
        startDate,
        duration,
        wbsElementIds,
        expectedActivities,
        deliverables
      });
      console.log('success');
      history.push(`${routes.CHANGE_REQUESTS}`);
    } else {
      console.log('failed');
    }

    /**
     * need to get 
     *  userId, 
     *  projectId, 
     *  wbsElementIds of dependencies (should be in wbs num format)
     * 
     * need to pass down
     *  name
     *  crId
     *  startDate
     *  duration
     *  ea
     *  deliverables
     */
  }

  return (
    <CreateWPFormView
      dependencies={dependencies}
      depUtils={depUtils}
      expectedActivities={expectedActivities}
      eaUtils={eaUtils}
      deliverables={deliverables}
      delUtils={delUtils}
      onSubmit={handleSubmit}
      onCancel={() => history.goBack()}
    />
  );
};

export default CreateWPForm;
