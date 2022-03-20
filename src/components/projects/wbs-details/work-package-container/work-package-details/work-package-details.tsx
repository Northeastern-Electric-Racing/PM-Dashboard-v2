/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import { wbsPipe, endDatePipe, fullNamePipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import { Col, Container, Row, Form } from 'react-bootstrap';
import './work-package-details.module.css';
import EditableDetail from '../../../../shared/editable-detail/editable-detail';
import { FormContext } from '../work-package-container';
import { useContext } from 'react';
import { WbsElementStatus } from 'utils/lib/types/project-types';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  const { editMode, setField } = useContext(FormContext);

  function formatDate(date: Date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  }

  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <EditableDetail
            title="Work Package Name"
            value={workPackage.name}
            type="text"
            fieldName="name"
          />
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
            fieldName="projectLead"
          />
          <EditableDetail
            title="Project Manager"
            value={fullNamePipe(workPackage.projectManager)}
            type="text"
            fieldName="projectManager"
          />
          <EditableDetail
            title="Duration"
            value={`${workPackage.duration}`}
            type="number"
            suffix="weeks"
            fieldName="duration"
            min={0}
          />
        </Col>
        <Col xs={6} md={4}>
          <EditableDetail
            title="Start Date"
            value={
              editMode
                ? formatDate(workPackage.startDate)
                : workPackage.startDate.toLocaleDateString()
            }
            type="date"
            fieldName="startDate"
          />
          <EditableDetail
            title="End Date"
            value={endDatePipe(workPackage.startDate, workPackage.duration)}
            type="date"
            readOnly={true}
            fieldName="endDate"
          />
          <EditableDetail
            title="Progress"
            value={`${workPackage.progress}`}
            suffix="%"
            type="number"
            fieldName="progress"
            min={0}
            max={100}
          />
        </Col>
      </Row>
    </Container>
  );

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
            <Form.Control as="select" onChange={(e) => setField('status', e.target.value)}>
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
