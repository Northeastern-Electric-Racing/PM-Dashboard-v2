/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 *
 * React-bootstrap grid documentation: https://react-bootstrap.github.io/layout/grid/
 */

import styles from './useful-links.module.css';
import { linkPipe } from '../../../shared/pipes';
import PageBlock from '../../shared/page-block/page-block';
import { Col, Container, Row } from 'react-bootstrap';

const UsefulLinks: React.FC = () => {
  let financeLinks = [
    linkPipe(
      'Personal purchasing guidelines',
      'https://docs.google.com/document/d/1M5Ldy9L1BifBo18tdKpv3CH-frRneyEK26hUXbtMg7Q/edit'
    ),
    linkPipe('Procurement Form', 'https://forms.gle/6ztRoa1iL7p1KHwP6')
  ];
  const financeBullets = financeLinks.map((link, idx) => <li key={idx}>{link}</li>);

  let otherLinks = [
    linkPipe(
      'Part numbering spreadsheet',
      'https://docs.google.com/spreadsheets/d/1av0ReONZF3r82kCvkUEGl3uue4jfQgbw-KQDZnsejPQ/edit'
    ),
    linkPipe(
      'Reimbursement guidelines',
      'https://docs.google.com/document/d/1HvLnVNzZTftgoAXppIEp-gTmUBQGt-V6n97prziWWrs/edit'
    ),
    linkPipe(
      'McMaster order sheet',
      'https://docs.google.com/spreadsheets/d/1kqpnw8jZDx2GO5NFUtqefRXqT1XX46iMx5ZI4euPJgY/edit'
    )
  ];
  const otherBullets = otherLinks.map((link, idx) => <li key={idx}>{link}</li>);

  return (
    <PageBlock
      title={'Useful Links'}
      headerRight={<></>}
      body={
        <Container fluid className={styles.linksContainer}>
          <Row>
            <Col md>
              <h4>Finance</h4>
              <ul>{financeBullets}</ul>
            </Col>
            <Col md>
              <h4>Other</h4>
              <ul>{otherBullets}</ul>
            </Col>
          </Row>
        </Container>
      }
    />
  );
};

export default UsefulLinks;
