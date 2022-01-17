/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import { Col, Container, Row, Form } from 'react-bootstrap';
import PageBlock from '../../../../shared/page-block/page-block';
import ProjectFormDetail from './project-form-detail/project-form-detail';
// import './work-package-details.module.css';

// new parts added at the bottom
interface projectDetailsProps {
  project: Project;
}

const ProjectEditDetails: React.FC<projectDetailsProps> = ({ project }) => {
  // const editMode = useContext(EditModeContext);
  const detailsBody = (
    <Container fluid>
      <Form>
        <Row>
          <b>Project Details</b>
          <Form.Group>
            <Form.Control>
              placeholder={'status'}
              option={'inactive'}
              option={'active'}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ProjectFormDetail type="title" isReadonly={false} details={project} />
            <ProjectFormDetail type="wbs" isReadonly={false} details={project} />
            <ProjectFormDetail type="project-lead" isReadonly={false} details={project} />
            <ProjectFormDetail type="project-manager" isReadonly={false} details={project} />
          </Col>
          <Col xs={6} md={4}>
            <ProjectFormDetail type="duration" isReadonly={true} details={project} />
            <ProjectFormDetail type="start-date" isReadonly={true} details={project} />
            <ProjectFormDetail type="end-date" isReadonly={true} details={project} />
            <br />
            <ProjectFormDetail type="progress" isReadonly={false} details={project} />
            <b>Timeline Status:</b> <br />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <ProjectFormDetail type="slide-deck" isReadonly={false} details={project} />
            <ProjectFormDetail type="task-list" isReadonly={false} details={project} />
            <ProjectFormDetail type="bom" isReadonly={false} details={project} />
            <ProjectFormDetail type="google-drive" isReadonly={false} details={project} />
          </Col>
        </Row>
      </Form>
    </Container>
  );

  return (
    <PageBlock
      title={'Project Edit Form Details'}
      headerRight={<b>{project.status}</b>}
      body={detailsBody}
    />
  );
};

export default ProjectEditDetails;
