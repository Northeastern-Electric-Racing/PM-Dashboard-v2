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

type FormFieldType = 'select' | 'checkbox';

interface FilterFormField {
  label: string;
  type: FormFieldType;
  values: string[];
  currentValue: number[];
}

const filterFieldsList: FilterFormField[] = [
  {
    label: 'Requester',
    type: 'select',
    values: ['a', 'b'],
    currentValue: [0]
  },
  {
    label: 'Project',
    type: 'checkbox',
    values: ['a', 'b'],
    currentValue: [0]
  },
  {
    label: 'Type',
    type: 'select',
    values: ['a'],
    currentValue: [0]
  },
  {
    label: 'Implemented',
    type: 'select',
    values: ['a'],
    currentValue: [0]
  }
];

const ChangeRequestsTable: React.FC = () => {
  const [filterFields, setFilterFields] = useState(filterFieldsList);
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

  const changeRequestsTable = <CRTable changeRequests={transformToDisplayChangeRequests(data!)} />;

  const changeRequestsContainer = (
    <Container>
      <Row>
        <Col>
          <ChangeRequestsFilter
            filterFields={filterFields}
            setFilterFields={setFilterFields}
          ></ChangeRequestsFilter>
        </Col>
        <Col>{changeRequestsTable}</Col>
      </Row>
    </Container>
  );

  return changeRequestsContainer;
};

export default ChangeRequestsTable;
