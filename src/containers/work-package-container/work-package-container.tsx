/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { WorkPackage, apiRoutes, WbsNumber } from 'utils';
import { apiFetch } from '../../shared/axios';
import { wbsPipe } from '../../shared/pipes';
import WorkPackageDetails from '../../components/work-package-details/work-package-details';
import WorkPackageRules from '../../components/work-package-rules/work-package-rules';
import './work-package-container.module.css';

interface WorkPackageContainerProps {
  wbsNum: WbsNumber;
}

const WorkPackageContainer: React.FC<WorkPackageContainerProps> = ({ wbsNum }) => {
  const [workPackage, setWorkPackage] = useState<WorkPackage>(); // store projects data

  // Transforms given project data and sets local state
  const updateData: (workPackage: WorkPackage) => void = (wp) => {
    wp.startDate = new Date(wp.startDate);
    setWorkPackage(wp);
  };

  // Fetch list of change requests from API on component loading
  useEffect(() => {
    let mounted = true; // indicates component is mounted

    const fetchWorkPackage: Function = async () => {
      apiFetch
        .get(`${apiRoutes.WORK_PACKAGES}/${wbsPipe(wbsNum)}`)
        .then((response: AxiosResponse<WorkPackage>) => (mounted ? updateData(response.data) : ''))
        .catch((error) =>
          mounted ? console.log('fetch work package error: ' + error.message) : ''
        );
    };
    fetchWorkPackage();

    // cleanup function indicates component has been unmounted
    return () => {
      mounted = false;
    };
  }, [wbsNum]);

  let output: ReactElement = <p>{'Loading...'}</p>;

  if (workPackage !== undefined) {
    output = (
      <>
        <div className="mx-5 px-4 pt-3">
          <h3>
            {wbsPipe(wbsNum)} - {workPackage.name}
          </h3>
        </div>
        <WorkPackageDetails className="px-5 py-3" workPackage={workPackage!} />
        <WorkPackageRules className="px-5 py-3" workPackage={workPackage!} />
        <p className="px-5 py-3">description goes here</p>
        <p className="px-5 py-3">changes go here</p>
      </>
    );
  }

  return <div>{output}</div>;
};

export default WorkPackageContainer;
