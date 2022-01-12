/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { ActivationChangeRequest, ChangeRequest, StageGateChangeRequest, StandardChangeRequest } from 'utils';
import { exampleActivationChangeRequest, exampleAllChangeRequests, exampleStageGateChangeRequest, exampleStandardChangeRequest } from '../../../../test-support/test-data/change-requests.stub';
import { routerWrapperBuilder } from '../../../../test-support/test-utils';
import ChangeRequestDetails from './change-request-details';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (cr: ChangeRequest) => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <ChangeRequestDetails changeRequest={cr} />
    </RouterWrapper>
  );
};

describe('Change request details common display element tests', () => {
  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders the title for CR %#',
    (cr: ChangeRequest) => {
      renderComponent(cr);
      expect(screen.getByText(`Change Request #${cr.crId}`)).toBeInTheDocument();
    }
  );

  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders submitter data for CR %#',
    (cr: ChangeRequest) => {
      renderComponent(cr);
      expect(screen.getByText(`Submitted`)).toBeInTheDocument();
      expect(
        screen.getByText(`${cr.submitter.firstName} ${cr.submitter.lastName}`)
      ).toBeInTheDocument();
      expect(screen.getByText(`${cr.dateSubmitted.toUTCString()}`)).toBeInTheDocument();
    }
  );

  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders type data for CR %#',
    (cr: ChangeRequest) => {
      renderComponent(cr);
      expect(screen.getByText(`Type`)).toBeInTheDocument();
      expect(screen.getByText(`${cr.type}`)).toBeInTheDocument();
    }
  );

  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders status data for CR %#',
    (cr: ChangeRequest) => {
      renderComponent(cr);
      if (cr.dateImplemented) {
        expect(screen.getByText(`Implemented`)).toBeInTheDocument();
      }
      if (cr.dateReviewed && cr.accepted && !cr.dateImplemented) {
        expect(screen.getByText(`Accepted`)).toBeInTheDocument();
      }
      if (cr.dateReviewed && !cr.accepted) {
        expect(screen.getByText(`Denied`)).toBeInTheDocument();
      }
      if (!cr.dateReviewed) {
        expect(screen.getByText(`Open`)).toBeInTheDocument();
      }
    }
  );

  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders changes data for CR %#',
    (cr: ChangeRequest) => {
      renderComponent(cr);
      expect(screen.getByText(`Implemented Changes`)).toBeInTheDocument();
    }
  );
});

describe('Change request details standard cr display element tests', () => {
  it('Renders what section', () => {
    renderComponent(exampleStandardChangeRequest);
    expect(screen.getByText(`What`)).toBeInTheDocument();
  });

  it('Renders why section', () => {
    renderComponent(exampleStandardChangeRequest);
    expect(screen.getByText(`Why`)).toBeInTheDocument();
  });

  it('Renders impact section', () => {
    const cr: StandardChangeRequest = exampleStandardChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Impact`)).toBeInTheDocument();
  });
});

describe('Change request details activation cr display element tests', () => {
  const cr: ActivationChangeRequest = exampleActivationChangeRequest;

  it('Renders project lead', () => {
    renderComponent(cr);
    expect(screen.getByText(`Project Lead`)).toBeInTheDocument();
  });

  it('Renders project manager', () => {
    renderComponent(cr);
    expect(screen.getByText(`Project Manager`)).toBeInTheDocument();
  });

  it('Renders start date', () => {
    renderComponent(cr);
    expect(screen.getByText(`Start Date`)).toBeInTheDocument();
  });

  it('Renders confirm details', () => {
    renderComponent(cr);
    expect(screen.getByText(`Confirm WP Details`)).toBeInTheDocument();
  });
});

describe('Change request details stage gate cr display element tests', () => {
  const cr: StageGateChangeRequest = exampleStageGateChangeRequest;

  it('Renders confirm completed', () => {
    renderComponent(cr);
    expect(screen.getByText(`Confirm WP Completed`)).toBeInTheDocument();
  });

  it('Renders leftover budget', () => {
    renderComponent(cr);
    expect(screen.getByText(`Leftover Budget`)).toBeInTheDocument();
  });
});
