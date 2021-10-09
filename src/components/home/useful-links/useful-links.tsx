/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 *
 */

import { linkPipe } from '../../../shared/pipes';
import PageBlock from '../../shared/page-block/page-block';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './useful-links.module.css';

// React-bootstrap grid documentation: https://react-bootstrap.github.io/layout/grid/
const UsefulLinks: React.FC = () => {
  let financeLinks = [
    linkPipe(
      'Personal purchasing guidelines',
      'https://docs.google.com/document/d/1M5Ldy9L1BifBo18tdKpv3CH-frRneyEK26hUXbtMg7Q/edit'
    ),
    linkPipe('Procurement Form', 'https://forms.gle/6ztRoa1iL7p1KHwP6'),
    linkPipe(
      'Reimbursement guidelines',
      'https://docs.google.com/document/d/1HvLnVNzZTftgoAXppIEp-gTmUBQGt-V6n97prziWWrs/edit'
    )
  ];

  let otherLinks = [
    linkPipe(
      'Part numbering spreadsheet',
      'https://docs.google.com/spreadsheets/d/1av0ReONZF3r82kCvkUEGl3uue4jfQgbw-KQDZnsejPQ/edit'
    ),
    linkPipe(
      'McMaster order sheet',
      'https://docs.google.com/spreadsheets/d/1kqpnw8jZDx2GO5NFUtqefRXqT1XX46iMx5ZI4euPJgY/edit'
    ),
    linkPipe('Individual Member Goals Form', 'https://forms.gle/MAZJSFcMBjn44p3F6'),
    linkPipe('Manufacturing Request Form', 'https://forms.gle/vJmTRt2xnzGa7akb8'),
    linkPipe(
      'Glossary Document',
      'https://docs.google.com/document/d/1_kr7PQxjYKvBTmZc8cxeSv5xx0lE88v0wVXkVg3Mez8/edit?usp=sharing'
    )
  ];

  return (
    <PageBlock
      title={'Useful Links'}
      headerRight={<></>}
      body={
        <Container fluid className={styles.linksContainer}>
          <Row>
            <Col md>
              <h4>Finance</h4>
              <ul>
                {financeLinks.map((link, idx) => (
                  <li key={idx}>{link}</li>
                ))}
              </ul>
            </Col>
            <Col md>
              <h4>Other</h4>
              <ul>
                {otherLinks.map((link, idx) => (
                  <li key={idx}>{link}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      }
    />
  );
};

export default UsefulLinks;
