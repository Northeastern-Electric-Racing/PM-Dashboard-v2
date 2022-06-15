/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import PageTitle from '../../layouts/page-title/page-title';
import PageBlock from '../../layouts/page-block/page-block';

const HelpPage: React.FC = () => {
  return (
    <Container fluid>
      <PageTitle title="Help" />
      <PageBlock
        title="Resources"
        headerRight={<></>}
        body={
          <Container fluid>
            <Row>
              <Col md={6} lg={4}>
                <FontAwesomeIcon icon={faScroll} size="1x" className="pr-1" />
              </Col>
              <Col md={4} lg={2}></Col>
            </Row>
          </Container>
        }
      />
      <PageBlock
        title="Support"
        headerRight={<></>}
        body={
          <Container fluid>
            <Row>
              <Col md={4} lg={2}>
                <b>First Name:</b>
              </Col>
              <Col md={4} lg={2}>
                <b>Last Name:</b>
              </Col>
              <Col md={4} lg={3}>
                <b>Email: </b>
              </Col>
              <Col md={4} lg={2}>
                <b>Email ID:</b>
              </Col>
              <Col md={4} lg={2}>
                <b>Role: </b>
              </Col>
            </Row>
          </Container>
        }
      />
    </Container>
  );
};

export default HelpPage;
