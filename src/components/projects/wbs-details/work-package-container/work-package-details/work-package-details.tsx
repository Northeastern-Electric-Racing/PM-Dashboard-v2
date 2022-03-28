/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import { wbsPipe, endDatePipe, fullNamePipe, percentPipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import { Col, Container, Row, Form } from 'react-bootstrap';
import './work-package-details.module.css';
import EditableDetail from '../../../../shared/editable-detail/editable-detail';
import { EditModeContext } from '../work-package-container';
import { useContext } from 'react';
import { WbsElementStatus } from 'utils/lib/types/project-types';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  const detailsBody = (
    <Container fluid>
      <Form>
        <Row>
          <Col xs={12} md={6}>
            <EditableDetail title="Work Package Name" value={workPackage.name} type="text" />
            <EditableDetail
              title="WBS #"
              value={wbsPipe(workPackage.wbsNum)}
              type="text"
              readOnly={true}
            />
            <EditableDetail
              title="Project Lead"
              value={fullNamePipe(workPackage.projectLead)}
              type="text"
            />
            <EditableDetail
              title="Project Manager"
              value={fullNamePipe(workPackage.projectManager)}
              type="text"
            />
            <EditableDetail
              title="Duration"
              value={`${workPackage.duration}`}
              type="number"
              suffix="weeks"
            />
          </Col>
          <Col xs={6} md={4}>
            <EditableDetail
              title="Start Date"
              value={workPackage.startDate.toLocaleDateString()}
              type="date"
            />
            <EditableDetail
              title="End Date"
              value={endDatePipe(workPackage.startDate, workPackage.duration)}
              type="date"
              readOnly={true}
            />
            <EditableDetail
              title="Progress"
              value={percentPipe(workPackage.progress)}
              type="number"
            />
            <EditableDetail
              title="Expected Progress"
              value={percentPipe(workPackage.expectedProgress)}
              type="number"
              readOnly={true}
            />
            <EditableDetail
              title="Timeline Status"
              value={workPackage.timelineStatus}
              type="text"
              readOnly={true}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );

  const editMode = useContext(EditModeContext);
  const statuses = Object.values(WbsElementStatus);
  const index = statuses.indexOf(workPackage.status);
  statuses.splice(index, 1);

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={
        editMode ? (
          <div>
            <label>Status</label>
            <Form.Control as="select">
              <option>{workPackage.status}</option>
              {statuses.map((status) => (
                <option>{status}</option>
              ))}
            </Form.Control>
          </div>
        ) : (
          <b>{workPackage.status}</b>
        )
      }
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
