/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequest } from 'utils';
import { booleanPipe, fullNamePipe, wbsPipe } from '../../../shared/pipes';
import { useAllChangeRequests } from '../../../services/change-requests.hooks';
import { DisplayChangeRequest } from './change-requests-table/change-requests-table';
import CRTable from './change-requests-table/change-requests-table'; // Directly rename the default import
import ChangeRequestsFilter from './change-requests-filter/change-requests-filter';
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import './change-requests-table.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { ChangeRequestReason } from 'utils/lib/types/change-request-types';
import { ChangeRequestType } from 'utils/lib/types/change-request-types';

type FormFieldType = 'select' | 'checkbox';

interface FilterFormField {
  label: string;
  type: FormFieldType;
  values: string[];
  currentValue: number[];
}

const filterFieldsList: FilterFormField[] = [
  {
    label: 'Type',
    type: 'select',
    values: [''].concat(
      Object.keys(ChangeRequestType).map(
        (key) => ChangeRequestType[key as typeof ChangeRequestType.Other]
      )
    ),
    currentValue: [0]
  },
  {
    label: 'Impact',
    type: 'checkbox',
    values: ['Scope', 'Budget', 'Impact'],
    currentValue: []
  },
  {
    label: 'Reason',
    type: 'checkbox',
    values: ['']
      .concat(
        Object.keys(ChangeRequestReason).map(
          (key) => ChangeRequestReason[key as typeof ChangeRequestReason.Other]
        )
      )
      .slice(1),
    currentValue: []
  },
  {
    label: 'State',
    type: 'select',
    values: ['', 'Not Reviewed', 'Accepted', 'Denied'],
    currentValue: [0]
  },
  {
    label: 'Implemented',
    type: 'select',
    values: ['', 'Yes', 'No'],
    currentValue: [0]
  }
];

const ChangeRequestsTable: React.FC = () => {
  const [type, setType] = useState('');
  const [impact, setImpact] = useState<number[]>([]);
  const [reason, setReason] = useState('');
  const [state, setState] = useState<number[]>([]);
  const [implemented, setImplemented] = useState('');
  const { isLoading, isError, data, error } = useAllChangeRequests();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  console.log(type + impact + reason + state + implemented);

  const filterCRs = (
    changeRequests: ChangeRequest[],
    type: string,
    impact: number[],
    reason: string,
    state: number[],
    implemented: string
  ): ChangeRequest[] => {
    // Type filter
    if (type !== '') {
      changeRequests = changeRequests.filter(
        (changeRequest: ChangeRequest) => changeRequest.type === type
      );
    }

    // // Reason Filter
    // if (reason !== '') {
    //   changeRequests = changeRequests.filter(
    //     (changeRequest: ChangeRequest) => changeRequest.reason === reason
    //   );
    // }

    // State filter
    if (state.length !== 0) {
      changeRequests = changeRequests.filter((changeRequest: ChangeRequest) => {
        var filterBool = false;
        if (state.indexOf(0) !== -1) {
          filterBool = filterBool || changeRequest.dateReviewed === undefined;
        }
        if (state.indexOf(1) !== -1) {
          filterBool = filterBool || changeRequest.accepted === true;
        }
        if (state.indexOf(2) !== -1) {
          filterBool = filterBool || changeRequest.accepted === false;
        }
        return filterBool;
      });
    }

    // Implemented Filter
    if (implemented !== '') {
      changeRequests = changeRequests.filter(
        (changeRequest: ChangeRequest) =>
          (implemented === 'Yes') === (changeRequest.dateImplemented !== undefined)
      );
    }

    return changeRequests;
  };

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

  const sendDataToParent = (
    type: string,
    impact: number[],
    reason: string,
    state: number[],
    implemented: string
  ) => {
    setType(type);
    setImpact(impact);
    setReason(reason);
    setState(state);
    setImplemented(implemented);
  };

  const changeRequestsTable = () => {
    return (
      <CRTable
        changeRequests={transformToDisplayChangeRequests(
          filterCRs(data!, type, impact, reason, state, implemented)
        )}
      />
    );
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
