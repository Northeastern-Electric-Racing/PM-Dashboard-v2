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
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import PageBlock from '../../../layouts/page-block/page-block';
import ErrorPage from '../../ErrorPage/error-page';
import './upcoming-deadlines.module.css';

const UpcomingDeadlines: React.FC = () => {
  const theme = useTheme();
  const workPackages = useAllWorkPackagesUpcomingDeadlines();

  if (workPackages.isError) {
    return <ErrorPage message={workPackages.error.message} error={workPackages.error} />;
  }

  const fullDisplay = (
    <Row className="flex-nowrap overflow-auto">
      {workPackages.data?.map((wp) => (
        <Col className="px-1" xs={12} sm={7} md={5} lg={4} xl={3}>
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
                  <Row className="pb-1">Project Manager: {fullNamePipe(wp.projectManager)}</Row>
                  <Row>
                    {wp.expectedActivities.length} Expected Activities, {wp.deliverables.length}{' '}
                    Deliverables
                  </Row>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <PageBlock
      title={'Upcoming Deadlines'}
      headerRight={<></>}
      body={
        <Container fluid>{workPackages.isLoading ? <LoadingIndicator /> : fullDisplay}</Container>
      }
    />
  );
};

export default UpcomingDeadlines;
