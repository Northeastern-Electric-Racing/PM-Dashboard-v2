/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import {
  ChangeRequest,
  StandardChangeRequest,
  ActivationChangeRequest,
  StageGateChangeRequest,
  ChangeRequestExplanation
} from 'utils';
import {
  exampleStandardChangeRequest,
  exampleActivationChangeRequest,
  exampleStageGateChangeRequest,
  exampleAllChangeRequests
} from '../../../../test-support/test-data/change-requests.stub';
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
      expect(screen.getByText(`list of changes`)).toBeInTheDocument();
    }
  );
});

describe('Change request details standard cr display element tests', () => {
  it('Renders what section', () => {
    renderComponent(exampleStandardChangeRequest);
    expect(screen.getByText(`What`)).toBeInTheDocument();
    expect(screen.getByText(`${exampleStandardChangeRequest.what}`)).toBeInTheDocument();
  });

  it('Renders why section', () => {
    renderComponent(exampleStandardChangeRequest);
    expect(screen.getByText(`Why`)).toBeInTheDocument();
    exampleStandardChangeRequest.why.forEach((explanation: ChangeRequestExplanation) => {
      expect(screen.getByText(`${explanation.reason}`)).toBeInTheDocument();
      expect(screen.getByText(`${explanation.explain}`)).toBeInTheDocument();
    });
  });

  it('Renders impact section', () => {
    const cr: StandardChangeRequest = exampleStandardChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Impact`)).toBeInTheDocument();
    expect(screen.getByText(`Scope Impact`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.scopeImpact}`)).toBeInTheDocument();
    expect(screen.getByText(`Timeline Impact`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.timelineImpact} weeks`)).toBeInTheDocument();
    expect(screen.getByText(`Budget Impact`)).toBeInTheDocument();
    expect(screen.getByText(`$${cr.budgetImpact}`)).toBeInTheDocument();
  });
});

describe('Change request details activation cr display element tests', () => {
  it('Renders project lead', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Project Lead`)).toBeInTheDocument();
    expect(
      screen.getByText(`${cr.projectLead.firstName} ${cr.projectLead.lastName}`)
    ).toBeInTheDocument();
  });

  it('Renders project manager', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Project Manager`)).toBeInTheDocument();
    expect(
      screen.getByText(`${cr.projectManager.firstName} ${cr.projectManager.lastName}`)
    ).toBeInTheDocument();
  });

  it('Renders start date', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Start Date`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.dateSubmitted.toUTCString()}`)).toBeInTheDocument();
  });

  it('Renders confirm details', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Confirm WP Details`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.confirmDetails ? 'YES' : 'NO'}`)).toBeInTheDocument();
  });
});

describe('Change request details stage gate cr display element tests', () => {
  it('Renders confirm completed', () => {
    const cr: StageGateChangeRequest = exampleStageGateChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Confirm WP Completed`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.confirmCompleted ? 'YES' : 'NO'}`)).toBeInTheDocument();
  });

  it('Renders leftover budget', () => {
    const cr: StageGateChangeRequest = exampleStageGateChangeRequest;
    renderComponent(cr);
    expect(screen.getByText(`Leftover Budget`)).toBeInTheDocument();
    expect(screen.getByText(`$${cr.leftoverBudget}`)).toBeInTheDocument();
  });
});
