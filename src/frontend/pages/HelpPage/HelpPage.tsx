/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Col, Container, Row } from 'react-bootstrap';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import { iconLinkPipe } from '../../../shared/pipes';
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
              <Col md={4} lg={2}>
                {iconLinkPipe(
                  faScroll,
                  'Glossary Document',
                  'https://docs.google.com/document/d/1_kr7PQxjYKvBTmZc8cxeSv5xx0lE88v0wVXkVg3Mez8/edit?usp=sharing'
                )}
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
