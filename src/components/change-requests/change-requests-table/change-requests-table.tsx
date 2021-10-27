/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequest } from 'utils';
import { booleanPipe, fullNamePipe, wbsPipe } from '../../../shared/pipes';
import { useAllChangeRequests } from '../../../services/change-requests.hooks';
import { DisplayChangeRequest } from './change-requests-table/change-requests-table';
import CRTable from './change-requests-table/change-requests-table'; // Directly rename the default import
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import './change-requests-table.module.css';
import ChangeRequestsFilter from '../change-requests-filter/change-requests-filter';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';

const ChangeRequestsTable: React.FC = () => {
  const [type, setType] = useState('');
  const [impact, setImpact] = useState([]);
  const [reason, setReason] = useState('');
  const [state, setState] = useState([]);
  const [implemented, setImplemented] = useState('');
  const { isLoading, isError, data, error } = useAllChangeRequests();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const transformToDisplayChangeRequests = (changeRequests: ChangeRequest[]) => {
    return changeRequests.map((cr: ChangeRequest) => {
      return {
        id: cr.id,
        submitterName: fullNamePipe(cr.submitter),
        wbsNum: wbsPipe(cr.wbsNum),
        type: cr.type,
        dateReviewed: cr.dateReviewed ? new Date(cr.dateReviewed).toLocaleDateString() : '',
        accepted: cr.accepted ? booleanPipe(cr.accepted) : '',
        dateImplemented: cr.dateImplemented ? new Date(cr.dateImplemented).toLocaleDateString() : ''
      };
    }) as DisplayChangeRequest[];
  };

  const changeRequestsTable = () => {
    return <CRTable changeRequests={transformToDisplayChangeRequests(data!)} />;
  };

  const changeRequestsContainer = () => {
    return (
      <Container fluid>
        <Row>
          <Col xs={3}>
            <ChangeRequestsFilter update={sendDataToParent} />
          </Col>
          <Col md={9}>{changeRequestsTable()}</Col>
        </Row>
      </Container>
    );
  };

  return changeRequestsContainer();
};

export default ChangeRequestsTable;
