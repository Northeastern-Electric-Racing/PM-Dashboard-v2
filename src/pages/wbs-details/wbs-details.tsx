/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateWBS, wbsIsProject } from 'utils';
import { Project } from 'utils/src';
import ProjectDetails from '../../components/project-details/project-details';
import { apiFetch } from '../../shared/axios';
import styles from './wbs-details.module.css';

interface ProjectRequestData {
  message?: string,
  data?: Project
}

const WBSDetails: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectRequestData>({});

  interface ParamTypes {
    wbsNum: string;
  }

  const { wbsNum } = useParams<ParamTypes>();

  validateWBS(wbsNum); // ensure the provided wbsNum is correctly formatted

  useEffect(() => {
    apiFetch.get<Project>(`/projects/${wbsNum}`)
      .then(({ data }: AxiosResponse<Project>) => {
        setProjectData({
          data: data
        });
      })
      .catch(error => {
        setProjectData({
          message: error.message
        });
      });
  }, []);

  const type: string = wbsIsProject(wbsNum) ? 'Project' : 'Work Package';
  return (
    <div>
      <h2>This is the WBS Page</h2>
      <p className={styles.describe}>
        {type} {wbsNum}
      </p>
      {projectData.data && <ProjectDetails project={projectData.data} />}
      {projectData.message && <p>{projectData.message}</p>}
    </div>
  );
};

export default WBSDetails;
