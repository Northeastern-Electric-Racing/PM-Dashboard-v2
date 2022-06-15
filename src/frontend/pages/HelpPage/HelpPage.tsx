/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Col, Container, Row } from 'react-bootstrap';
import { faScroll, faCode, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
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
            <Row className="pb-2">Check out these helpful resources:</Row>
            <Row>
              <Col md={4} lg={3}>
                {iconLinkPipe(
                  faScroll,
                  'Glossary Document',
                  'https://docs.google.com/document/d/1_kr7PQxjYKvBTmZc8cxeSv5xx0lE88v0wVXkVg3Mez8/edit?usp=sharing'
                )}
              </Col>
              <Col>Got any suggestions for additional resources? Message in Slack!</Col>
            </Row>
          </Container>
        }
      />
      <PageBlock
        title="Support"
        headerRight={<></>}
        body={
          <Container fluid>
            <Row className="pb-2">
              Any and all questions, comments, suggestions, bugs, or other issues can be directed to
              the resources below:
            </Row>
            <Row>
              <Col sm={5} md={4} lg={3}>
                {iconLinkPipe(
                  faCommentAlt,
                  'Message in Slack',
                  'slack://channel?team=T7MHAQ5TL&id=C02U5TKHLER'
                )}
              </Col>
              <Col sm={6} md={4} lg={3}>
                {iconLinkPipe(
                  faCode,
                  'Submit a ticket on GitHub',
                  'https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/new/choose'
                )}
              </Col>
            </Row>
          </Container>
        }
      />
    </Container>
  );
};

export default HelpPage;
