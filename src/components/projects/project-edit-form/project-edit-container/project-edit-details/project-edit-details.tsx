/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import { Col, Container, Row, Form } from 'react-bootstrap';
import PageBlock from '../../../../shared/page-block/page-block';
import EditableDetail from '../../../../shared/editable-detail/editable-detail';
import {
  weeksPipe,
  wbsPipe,
  endDatePipe,
  fullNamePipe,
  listPipe
} from '../../../../../shared/pipes';
import { WbsElementStatus } from 'utils/lib/types/project-types';

// new parts added at the bottom
interface projectDetailsProps {
  project: Project;
}

const ProjectEditDetails: React.FC<projectDetailsProps> = ({ project }) => {
  const statuses = Object.values(WbsElementStatus);

  function padLink(link: string | undefined) {
    return link === undefined ? 'Enter Link Here...' : link;
  }

  const statusSelect = (
    <Form.Control as="select">
      <option value={project.status}>{project.status}</option>
      {statuses.map((status) => {
        if (status !== project.status) return <option value={status}>{status}</option>;
      })}
    </Form.Control>
  );

  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <EditableDetail title="Project Title" type="title" value={project.name} />
          <EditableDetail title="Project WBS#" type="wbs" value={wbsPipe(project.wbsNum)} />
          <EditableDetail
            title="Project Lead"
            type="project-lead"
            value={fullNamePipe(project.projectLead)}
          />
          <EditableDetail
            title="Project Manager"
            type="project-manager"
            value={fullNamePipe(project.projectManager)}
          />
          <EditableDetail title="Budget" type="number" value={project.budget} />
        </Col>
        <Col xs={6} md={4}>
          <EditableDetail
            title="Duration"
            type="duration"
            value={String(project.duration)}
            suffix="weeks"
          />
          <EditableDetail title="Start Date" type="start-date" value="mm/dd/yyyy" readOnly={true} />
          <EditableDetail title="End Date" type="end-date" value="mm/dd/yyyy" readOnly={true} />
          <br />
          <EditableDetail title="Expected Progress" type="progress" value="100" suffix="%" />
          <EditableDetail title="Timeline Status" type="status" value={String(project.status)} />
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col>
          <EditableDetail
            title="Slide Deck"
            type="slide-deck"
            value={padLink(project.gDriveLink)}
          />
        </Col>
        <Col>
          <EditableDetail
            title="Task List"
            type="task-list"
            value={padLink(project.taskListLink)}
          />
        </Col>
        <Col>
          <EditableDetail title="BOM" type="bom" value={padLink(project.bomLink)} />
        </Col>
        <Col>
          <EditableDetail
            title="Google Drive"
            type="google-drive"
            value={padLink(project.slideDeckLink)}
          />
        </Col>
      </Row>
    </Container>
  );

  return (
    <PageBlock title={'Project Details (EDIT)'} headerRight={statusSelect} body={detailsBody} />
  );
};

export default ProjectEditDetails;
