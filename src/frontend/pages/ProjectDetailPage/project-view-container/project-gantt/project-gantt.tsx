/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Container } from 'react-bootstrap';
import { WorkPackage } from 'utils';
import PageBlock from '../../../../layouts/page-block/page-block';

interface ProjectGanttProps {
  workPackages: WorkPackage[];
}

const ProjectGantt: React.FC<ProjectGanttProps> = ({ workPackages }) => {
  return (
    <PageBlock title={'Gantt Chart'} headerRight={<></>} body={<Container fluid></Container>} />
  );
};

export default ProjectGantt;
