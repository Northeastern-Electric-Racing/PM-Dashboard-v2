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
import {
  ChangeRequestType,
  ChangeRequestReason,
  StandardChangeRequest,
  ActivationChangeRequest
} from '../../../utils/src/types/change-request-types';

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
    values: [],
    currentValue: [0]
  },
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
  const [filterFields, setFilterFields] = useState(filterFieldsList);
  const { isLoading, isError, data, error } = useAllChangeRequests();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  filterFields[0].values = [
    ...new Set(data!.map((cr: ChangeRequest) => fullNamePipe(cr.submitter)))
  ];
  filterFields[0].values.splice(0, 0, '');

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

  const combineFilters: Function = (filterFields: FilterFormField[]) => {
    return (cr: ChangeRequest) => {
      //check if pass each filter, then map result
      let filterMap = filterFields.map((filterField) => {
        if (filterField.type === 'checkbox') {
          if (filterField.currentValue.length === 0) {
            return true;
          }
          let filterVals = filterField.currentValue.map((index) => {
            return filterField.values[index];
          });
          return filterVals
            .map((value) => {
              return true; //todo
            })
            .every((element) => element);
        }
        if (filterField.type === 'select') {
          if (filterField.values[filterField.currentValue[0]] === '') {
            return true;
          } else {
            let selectValue = filterField.values[filterField.currentValue[0]];
            if (filterField.label === 'Requester') {
              return `${cr.submitter.firstName} ${cr.submitter.lastName}` === selectValue;
            }
            if (filterField.label === 'Type') {
              return cr.type === selectValue;
            }
            if (filterField.label === 'Implemented') {
              return (
                (cr.dateImplemented != undefined && selectValue === 'Yes') ||
                (cr.dateImplemented === undefined && selectValue === 'No')
              );
            }
          }
        }
      });
      console.log(filterMap);
      return filterMap.every((element) => element);
    };
  };

  const filterChangeRequests = (
    changeRequests: ChangeRequest[],
    filterFields: FilterFormField[]
  ) => {
    console.log(changeRequests);
    const filterFunction = combineFilters(filterFields);
    let val = changeRequests.filter((cr: ChangeRequest) => {
      console.log(filterFunction(cr));
      return filterFunction(cr);
    });
    console.log(val);
    return val;
  };

  const changeRequestsTable = () => {
    const moreData = data!.concat(data!).concat(data!).concat(data!).concat(data!).concat(data!);
    const lotsData = moreData.concat(moreData);
    return (
      <CRTable
        changeRequests={transformToDisplayChangeRequests(
          filterChangeRequests(lotsData, filterFields)
        )}
      />
    );
  };

  const changeRequestsContainer = () => {
    return (
      <Container fluid>
        <Row>
          <Col xs={3}>
            <ChangeRequestsFilter
              filterFields={filterFields}
              setFilterFields={setFilterFields}
            ></ChangeRequestsFilter>
          </Col>
          <Col md={9}>{changeRequestsTable()}</Col>
        </Row>
      </Container>
    );
  };

  return changeRequestsContainer();
};

export default ChangeRequestsTable;
