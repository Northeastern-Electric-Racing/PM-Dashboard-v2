/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from "@testing-library/react";
import { ActivationChangeRequest } from "utils";
import { exampleActivationChangeRequest } from "../../../../../../test-support/test-data/change-requests.stub";
import ActivationDetails from "./activation-details";

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (cr: ActivationChangeRequest) => {
  return render(<ActivationDetails cr={cr} />);
};

describe('Change request details activation cr display element tests', () => {
  const cr: ActivationChangeRequest = exampleActivationChangeRequest;

  it('Renders project lead', () => {
    renderComponent(cr);
    expect(screen.getByText(`Project Lead`)).toBeInTheDocument();
    expect(
      screen.getByText(`${cr.projectLead.firstName} ${cr.projectLead.lastName}`)
    ).toBeInTheDocument();
  });

  it('Renders project manager', () => {
    renderComponent(cr);
    expect(screen.getByText(`Project Manager`)).toBeInTheDocument();
    expect(
      screen.getByText(`${cr.projectManager.firstName} ${cr.projectManager.lastName}`)
    ).toBeInTheDocument();
  });

  it('Renders start date', () => {
    renderComponent(cr);
    expect(screen.getByText(`Start Date`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.startDate.toUTCString()}`)).toBeInTheDocument();
  });

  it('Renders confirm details', () => {
    renderComponent(cr);
    expect(screen.getByText(`Confirm WP Details`)).toBeInTheDocument();
    expect(screen.getByText(`${cr.confirmDetails ? 'YES' : 'NO'}`)).toBeInTheDocument();
  });
});