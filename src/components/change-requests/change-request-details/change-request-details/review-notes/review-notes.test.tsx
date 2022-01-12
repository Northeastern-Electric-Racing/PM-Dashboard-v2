/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequest } from "utils";
import { exampleAllChangeRequests } from "../../../../../test-support/test-data/change-requests.stub";
import { render, screen } from "../../../../../test-support/test-utils";
import ReviewNotes from "./review-notes";

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (cr: ChangeRequest) => {
  return render(<ReviewNotes reviewNotes={cr.reviewNotes} />);
};

describe('Change request review notes test', () => {
  // [0] = standard, [1] = activation, [2] = stage gate
  const cr: ChangeRequest[] = exampleAllChangeRequests;

  it('standard change request render review notes', () => {
    renderComponent(cr[0]);

    expect(screen.getByText('Review Notes')).toBeInTheDocument();
    expect(screen.getByText(cr[0].reviewNotes ? cr[0].reviewNotes! : 'There are no review notes for this change request.')).toBeInTheDocument();
  })

  it('activation change request render review notes', () => {
    renderComponent(cr[1]);

    expect(screen.getByText('Review Notes')).toBeInTheDocument();
    expect(screen.getByText(cr[1].reviewNotes ? cr[1].reviewNotes! : 'There are no review notes for this change request.')).toBeInTheDocument();
  })

  it('stage gate change request render review notes', () => {
    renderComponent(cr[2]);

    expect(screen.getByText('Review Notes')).toBeInTheDocument();
    expect(screen.getByText(cr[2].reviewNotes ? cr[2].reviewNotes! : 'There are no review notes for this change request.')).toBeInTheDocument();
  })
});
