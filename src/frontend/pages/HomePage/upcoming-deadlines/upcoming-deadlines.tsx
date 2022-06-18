/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../services/theme.hooks';
import { useAllWorkPackagesUpcomingDeadlines } from '../../../../services/work-packages.hooks';
import { datePipe, wbsPipe, fullNamePipe } from '../../../../shared/pipes';
import { routes } from '../../../../shared/routes';
import PageBlock from '../../../layouts/page-block/page-block';

const UpcomingDeadlines: React.FC = () => {
  const theme = useTheme();
  const workPackages = useAllWorkPackagesUpcomingDeadlines();
  return (
    <PageBlock
      title={'Upcoming Deadlines'}
      headerRight={<></>}
      body={
        <Container fluid>
          <Row className="flex-nowrap overflow-auto">
            {workPackages.data?.map((wp) => (
              <Col className="px-1" sm={7} md={5} lg={4} xl={3}>
                <Card border={theme.cardBorder} bg={theme.cardBg}>
                  <Card.Body className="p-3">
                    <Card.Title className="mb-2">
                      <Link to={`${routes.PROJECTS}/${wbsPipe(wp.wbsNum)}`}>
                        {wbsPipe(wp.wbsNum)} - {wp.name}
                      </Link>
                    </Card.Title>
                    <Card.Text>
                      <Container fluid>
                        <Row className="pb-1">End Date: {datePipe(wp.endDate)}</Row>
                        <Row className="pb-1">Engineering Lead: {fullNamePipe(wp.projectLead)}</Row>
                        <Row className="pb-1">
                          Project Manager: {fullNamePipe(wp.projectManager)}
                        </Row>
                        <Row>
                          {wp.expectedActivities.length} Expected Activites,{' '}
                          {wp.deliverables.length} Deliverables
                        </Row>
                      </Container>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      }
    />
  );
};

export default UpcomingDeadlines;
