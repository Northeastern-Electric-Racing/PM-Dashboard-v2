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
import './work-package-details.module.css';
import { EditModeContext } from '../work-package-container';
import { useContext } from 'react';
import WorkPackageDetail from './work-package-detail/work-package-detail';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  const editMode = useContext(EditModeContext);
  const detailsBody = (
    <Container fluid>
      <Form>
        <Row>
          <Col xs={12} md={6}>
            <WorkPackageDetail type="title" workPackage={workPackage}/>
            <b>WBS #:</b> {wbsPipe(workPackage.wbsNum)} <br />
            <b>Project Lead:</b> {listPipe(workPackage.projectLead, fullNamePipe)} <br />
            <b>Project Manager:</b> {fullNamePipe(workPackage.projectManager)} <br />
            <b>Duration:</b> {weeksPipe(workPackage.duration)} <br />
          </Col>
          <Col xs={6} md={4}>
            <b>Start Date:</b> {workPackage.startDate.toLocaleDateString()} <br />
            <b>End Date:</b> {endDatePipe(workPackage.startDate, workPackage.duration)} <br />
            <b>Progress:</b> {workPackage.progress}% <br />
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

export default WorkPackageDetails;
