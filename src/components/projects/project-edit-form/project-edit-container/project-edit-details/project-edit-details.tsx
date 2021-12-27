/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import {
  weeksPipe,
  wbsPipe,
  endDatePipe,
  fullNamePipe,
  listPipe
} from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import { Col, Container, Row, Form } from 'react-bootstrap';
// import './work-package-details.module.css';
import { EditModeContext } from '../project-edit-container';
import { useContext } from 'react';
import ProjectFormDetail from './project-form-detail/project-form-detail';

interface WorkPackageDetailsProps {
    workPackage: WorkPackage;
}

const ProjectEditDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
    const editMode = useContext(EditModeContext);
    const detailsBody = (
      <Container fluid>
        <Form>
          <Row>
            <Col xs={12} md={6}>
              <ProjectFormDetail type="title" workPackage={workPackage} />
              <ProjectFormDetail type="wbs" workPackage={workPackage} />
              <ProjectFormDetail type="project-lead" workPackage={workPackage} />
              <ProjectFormDetail type="project-manager" workPackage={workPackage} />
              <ProjectFormDetail type="duration" workPackage={workPackage} />
            </Col>
            <Col xs={6} md={4}>
              <ProjectFormDetail type="start-date" workPackage={workPackage} />
              <b>End Date: </b>
              {endDatePipe(workPackage.startDate, workPackage.duration)}
              <br />
              <ProjectFormDetail type="progress" workPackage={workPackage} />
              <b>Expected Progress:</b> <br />
              <b>Timeline Status:</b> <br />
            </Col>
          </Row>
        </Form>
      </Container>
    );
  
    return (
      <PageBlock
        title={'Work Package Details'}
        headerRight={<b>{workPackage.status}</b>}
        body={detailsBody}
      />
    );
  };
  
  export default ProjectEditDetails;

