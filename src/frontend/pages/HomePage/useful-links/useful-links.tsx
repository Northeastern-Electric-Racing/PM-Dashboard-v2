/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 *
 */

import {
  faCoins,
  faReceipt,
  faHandHoldingUsd,
  faDollarSign,
  faFileAlt,
  faSortNumericDown,
  faCogs
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row } from 'react-bootstrap';
import { iconLinkPipe } from '../../../../shared/pipes';
import PageBlock from '../../../layouts/page-block/page-block';
import './useful-links.module.css';

const UsefulLinks: React.FC = () => {
  const links = [
    iconLinkPipe(
      faCoins,
      'Purchasing Guidelines',
      'https://docs.google.com/document/d/1M5Ldy9L1BifBo18tdKpv3CH-frRneyEK26hUXbtMg7Q/edit'
    ),
    iconLinkPipe(
      faHandHoldingUsd,
      'Reimbursement Guidelines',
      'https://docs.google.com/document/d/1HvLnVNzZTftgoAXppIEp-gTmUBQGt-V6n97prziWWrs/edit'
    ),
    iconLinkPipe(faDollarSign, 'Procurement Form', 'https://forms.gle/6ztRoa1iL7p1KHwP6'),
    iconLinkPipe(
      faReceipt,
      'McMaster Order Sheet',
      'https://docs.google.com/spreadsheets/d/1kqpnw8jZDx2GO5NFUtqefRXqT1XX46iMx5ZI4euPJgY/edit'
    ),
    iconLinkPipe(
      faFileAlt,
      'Project Update Log',
      'https://docs.google.com/document/d/1w0B6upZRY28MlbVA4hyU3X_NRNP0cagmLWqjHn6B8OA/edit'
    ),
    iconLinkPipe(
      faSortNumericDown,
      'Part Numbering Guidelines',
      'https://docs.google.com/document/d/1Y8IXCvYjXP3RBj6h4-xLCHXVLW5R6pi3-4i5SYMKtZY/edit'
    ),
    iconLinkPipe(
      faCogs,
      'Hardware Guidelines',
      'https://docs.google.com/document/d/1OD1d1VaIEHCwiFCuU7wfwAPu-UA--0_QzbyJjBsexwg/edit'
    )
  ];

  return (
    <PageBlock title={'Useful Links'}>
      <Container fluid>
        <Row>{links}</Row>
      </Container>
    </PageBlock>
  );
};

export default UsefulLinks;
