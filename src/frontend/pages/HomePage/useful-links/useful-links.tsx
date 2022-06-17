/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 *
 */

import { Col, Container, Row } from 'react-bootstrap';
import { linkPipe } from '../../../../shared/pipes';
import PageBlock from '../../../layouts/page-block/page-block';
import styles from './useful-links.module.css';

const UsefulLinks: React.FC = () => {
  const financeLinks = [
    linkPipe(
      'Personal Purchasing Guidelines',
      'https://docs.google.com/document/d/1M5Ldy9L1BifBo18tdKpv3CH-frRneyEK26hUXbtMg7Q/edit'
    ),
    linkPipe(
      'Reimbursement Guidelines',
      'https://docs.google.com/document/d/1HvLnVNzZTftgoAXppIEp-gTmUBQGt-V6n97prziWWrs/edit'
    ),
    linkPipe('Procurement Form', 'https://forms.gle/6ztRoa1iL7p1KHwP6')
  ];

  const otherLinks = [
    linkPipe(
      'McMaster Order Sheet',
      'https://docs.google.com/spreadsheets/d/1kqpnw8jZDx2GO5NFUtqefRXqT1XX46iMx5ZI4euPJgY/edit'
    ),
    linkPipe(
      'Project Update Log',
      'https://docs.google.com/document/d/1w0B6upZRY28MlbVA4hyU3X_NRNP0cagmLWqjHn6B8OA/edit'
    ),
    linkPipe(
      'Part Numbering Guidelines',
      'https://docs.google.com/document/d/1Y8IXCvYjXP3RBj6h4-xLCHXVLW5R6pi3-4i5SYMKtZY/edit'
    ),
    linkPipe(
      'Hardware Guidelines',
      'https://docs.google.com/document/d/1OD1d1VaIEHCwiFCuU7wfwAPu-UA--0_QzbyJjBsexwg/edit'
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
