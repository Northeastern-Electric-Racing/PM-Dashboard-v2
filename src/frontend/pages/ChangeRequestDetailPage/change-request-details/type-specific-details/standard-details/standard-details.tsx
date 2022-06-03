/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Container, Row, Col } from 'react-bootstrap';
import { ChangeRequestExplanation, StandardChangeRequest } from 'utils';
import { weeksPipe, dollarsPipe } from '../../../../../../shared/pipes';
import PageBlock from '../../../../../layouts/page-block/page-block';
import styles from './standard-details.module.css';

interface StandardDetailsProps {
  cr: StandardChangeRequest;
}

const StandardDetails: React.FC<StandardDetailsProps> = ({ cr }: StandardDetailsProps) => {
  const { spacer } = styles;
  return (
    <PageBlock
      title={'Standard Change Request Details'}
      headerRight={<></>}
      body={
        <Container fluid>
          <Col className={spacer}>
            <Row className={spacer} sm={3} md={2} lg={2} xl={1}>
              <b>What</b>
            </Row>
            <Row className={spacer}>{cr.what}</Row>
          </Col>
          <Row className={spacer}>
            <Col className={spacer} xs={4} sm={3} md={2} lg={2} xl={1}>
              <b>Why</b>
            </Col>
            <Col>
              {cr.why.map((ele: ChangeRequestExplanation, idx: number) => (
                <Row key={idx}>
                  <Col className={spacer} md={4} lg={3} xl={2}>
                    <b>{ele.type}</b>
                  </Col>
                  <Col className={spacer}>{ele.explain}</Col>
                </Row>
              ))}
            </Col>
          </Row>
          <div className={spacer}>
            <Row className={spacer} xs={4} sm={3} md={2} lg={2} xl={1}>
              <b>Impact</b>
            </Row>
            <Col className={spacer}>
              <Row className={spacer} md={4} lg={3} xl={2}>
                <b>Scope Impact</b>
              </Row>
              <Row className={spacer}>{cr.scopeImpact}</Row>
            </Col>
            <Row>
              <Col className={spacer} xs={7} sm={6} md={4} lg={3} xl={2}>
                <b>Budget Impact</b>
              </Col>
              <Col className={spacer}>{dollarsPipe(cr.budgetImpact)}</Col>
            </Row>
            <Row>
              <Col className={spacer} xs={7} sm={6} md={4} lg={3} xl={2}>
                <b>Timeline Impact</b>
              </Col>
              <Col className={spacer}>{weeksPipe(cr.timelineImpact)}</Col>
            </Row>
          </div>
        </Container>
      }
    />
  );
};

export default StandardDetails;
