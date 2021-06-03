/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, WorkPackage } from 'utils';
import { weeksPipe, fullNamePipe, wbsPipe } from '../../shared/pipes';
import PrjsTable from '../../components/projects-table/projects-table'; // Directly rename the default import
import './projects-table.module.css';
import { useAllProjects } from '../../services/projects';

const ProjectsTable: React.FC = () => {
  const { isLoading, errorMessage, responseData } = useAllProjects();

  /**
   * Transform given list of projects into a list of display projects.
   * @param
   * @returns
   */
  const updateData = (projects: Project[]) => {
    return projects.map((prj: Project) => {
      return {
        wbsNum: wbsPipe(prj.wbsNum),
        name: prj.name,
        projectLead: fullNamePipe(prj.projectLead),
        projectManager: fullNamePipe(prj.projectManager),
        duration: weeksPipe(
          prj.workPackages.reduce((tot: number, cur: WorkPackage) => tot + cur.duration, 0)
        )
      };
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (errorMessage !== '' || responseData === undefined) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{errorMessage ? errorMessage : 'The data did not load properly.'}</p>
      </>
    );
  }

  return <PrjsTable allProjects={updateData(responseData)!} />;
};

export default ProjectsTable;
