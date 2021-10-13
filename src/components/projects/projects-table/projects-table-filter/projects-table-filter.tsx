/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

export interface FilterButtons {
  group: string;
  status: string;
  projectLead: string;
  projectManager: string;
  yearCreated: number;
}

interface FilterProps {
  allFilterButtons: FilterButtons[];
}

const ProjectsTableFilter: React.FC = () => {
  return (
    <>
      <h2>Filters</h2>
      <li>Group</li>
      <li>Status</li>
      <li>Project Lead</li>
      <li>Project Manager</li>
      <li>Year Created</li>
    </>
  );
};

export default ProjectsTableFilter;
