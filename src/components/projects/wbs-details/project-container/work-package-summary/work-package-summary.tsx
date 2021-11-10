/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Collapse } from 'react-bootstrap';
import { WorkPackage } from 'utils/src';
import { weeksPipe, wbsPipe, endDatePipe, listPipe } from '../../../../../shared/pipes';
import { routes } from '../../../../../shared/routes';
import styles from './work-package-summary.module.css';
import { Col, Container, Row } from 'react-bootstrap';

interface WorkPackageSummaryProps {
  workPackage: WorkPackage;
}

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({ workPackage }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Card.Header className={styles.header} onClick={() => setOpen(!open)} aria-expanded={open}>
        <div>
          <p className={styles.wbsNum}>{wbsPipe(workPackage.wbsNum)}</p>
          <p className={styles.name}>
            <Link to={`${routes.PROJECTS}/${wbsPipe(workPackage.wbsNum)}`}>{workPackage.name}</Link>
          </p>
          <p className={styles.duration}>{weeksPipe(workPackage.duration)}</p>
        </div>
      </Card.Header>

      <Collapse in={open}>
        <div>
          <Card.Body>
            <Container fluid>
              <Row>
                <Col xs={12} md={6}>
                  <b>Dependencies:</b> {listPipe(workPackage.dependencies, wbsPipe)}
                </Col>
                <Col xs={6} md={4}>
                  <b>Start date:</b> {workPackage.startDate.toLocaleDateString()} <br />
                  <b>End Date:</b> {endDatePipe(workPackage.startDate, workPackage.duration)}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};

export default WorkPackageSummary;
