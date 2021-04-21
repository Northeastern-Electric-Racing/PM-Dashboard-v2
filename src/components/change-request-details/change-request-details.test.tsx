/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import {
  exampleStandardChangeRequest,
  exampleActivationChangeRequest,
  exampleStageGateChangeRequest,
  exampleAllChangeRequests,
  ChangeRequest,
  StandardChangeRequest,
  ActivationChangeRequest,
  StageGateChangeRequest
} from 'utils';
import ChangeRequestDetails from './change-request-details';

describe('Change request details common display element tests', () => {
  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders the title for CR %#',
    (cr: ChangeRequest) => {
      render(<ChangeRequestDetails changeRequest={cr} />);
      expect(screen.getByText(`Change Request #${cr.id}`)).toBeInTheDocument();
    }
  );

  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders submitter data for CR %#',
    (cr: ChangeRequest) => {
      render(<ChangeRequestDetails changeRequest={cr} />);
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
      render(<ChangeRequestDetails changeRequest={cr} />);
      expect(screen.getByText(`Type`)).toBeInTheDocument();
      expect(screen.getByText(`${cr.type}`)).toBeInTheDocument();
    }
  );

  it.each(exampleAllChangeRequests.map((testCr: ChangeRequest) => [testCr]))(
    'Renders status data for CR %#',
    (cr: ChangeRequest) => {
      render(<ChangeRequestDetails changeRequest={cr} />);
      expect(screen.getByText(`Status`)).toBeInTheDocument();
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
      render(<ChangeRequestDetails changeRequest={cr} />);
      expect(screen.getByText(`Changes`)).toBeInTheDocument();
      expect(screen.getByText(`list of changes`)).toBeInTheDocument();
    }
  );
});

describe('Change request details standard cr display element tests', () => {
  it('Renders what section', () => {
    render(<ChangeRequestDetails changeRequest={exampleStandardChangeRequest} />);
    expect(screen.getByText(`What`)).toBeInTheDocument();
    expect(screen.getByText(`${exampleStandardChangeRequest.what}`)).toBeInTheDocument();
  });

  it('Renders why section', () => {
    render(<ChangeRequestDetails changeRequest={exampleStandardChangeRequest} />);
    expect(screen.getByText(`Why`)).toBeInTheDocument();
    exampleStandardChangeRequest.why.forEach((explanation) => {
      expect(screen.getByText(`${explanation.reason}`)).toBeInTheDocument();
      expect(screen.getByText(`${explanation.explain}`)).toBeInTheDocument();
    });
  });

  it('Renders impact section', () => {
    const cr: StandardChangeRequest = exampleStandardChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Impact`)).toBeInTheDocument();
    expect(screen.getByText(`Scope Impact`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.scopeImpact}`)).toBeInTheDocument();
    expect(screen.getByText(`Timeline Impact`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.timelineImpact} weeks`)).toBeInTheDocument();
    expect(screen.getByText(`Budget Impact`)).toBeInTheDocument();
    expect(screen.getByText(`$${cr.budgetImpact}`)).toBeInTheDocument();
  });

  it('Renders doc section', () => {
    const cr: StandardChangeRequest = exampleStandardChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Doc`)).toBeInTheDocument();
    expect(screen.getByText(`Documentation`)).toBeInTheDocument();
    expect(screen.getByText('Documentation').closest('a')).toHaveAttribute('href', cr.docLink);
  });
});

describe('Change request details activation cr display element tests', () => {
  it('Renders project lead', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Project Lead`)).toBeInTheDocument();
    expect(
      screen.getByText(`${cr.projectLead.firstName} ${cr.projectLead.lastName}`)
    ).toBeInTheDocument();
  });

  it('Renders project manager', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Project Manager`)).toBeInTheDocument();
    expect(
      screen.getByText(`${cr.projectManager.firstName} ${cr.projectManager.lastName}`)
    ).toBeInTheDocument();
  });

  it('Renders start date', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Start Date`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.dateSubmitted.toUTCString()}`)).toBeInTheDocument();
  });

  it('Renders confirm details', () => {
    const cr: ActivationChangeRequest = exampleActivationChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Confirm WP Details`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.confirmDetails ? 'YES' : 'NO'}`)).toBeInTheDocument();
  });
});

describe('Change request details stage gate cr display element tests', () => {
  it('Renders confirm completed', () => {
    const cr: StageGateChangeRequest = exampleStageGateChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Confirm WP Completed`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.confirmCompleted ? 'YES' : 'NO'}`)).toBeInTheDocument();
  });

  it('Renders leftover budget', () => {
    const cr: StageGateChangeRequest = exampleStageGateChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Leftover Budget`)).toBeInTheDocument();
    expect(screen.getByText(`$${cr.leftoverBudget}`)).toBeInTheDocument();
  });

  it('Renders required attendees', () => {
    const cr: StageGateChangeRequest = exampleStageGateChangeRequest;
    render(<ChangeRequestDetails changeRequest={cr} />);
    expect(screen.getByText(`Required Attendees`)).toBeInTheDocument();
    cr.designReviewAttendees.forEach((attendee) => {
      expect(screen.getByText(`${attendee.firstName} ${attendee.lastName}`)).toBeInTheDocument();
    });
  });
});
