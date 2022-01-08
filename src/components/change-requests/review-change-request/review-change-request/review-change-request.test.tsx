/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { exampleStandardChangeRequest } from "../../../../test-support/test-data/change-requests.stub";
import { render, screen } from "@testing-library/react";
import ReviewChangeRequestsView from "./review-change-request";

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (accepted: boolean) => {
    return render(<ReviewChangeRequestsView crId={exampleStandardChangeRequest.crId} accepted={accepted} />);
};

describe('review change request page', () => {
    it('renders accept title', () => {
        renderComponent(true);

        expect(screen.queryByText('Accept Change Request')).toBeInTheDocument();
    });

    it('renders deny title', () => {
        renderComponent(false);

        expect(screen.queryByText('Deny Change Request')).toBeInTheDocument();
    });

    it('renders label for textbox', () => {
        renderComponent(true);

        expect(screen.getByLabelText('Review Notes')).toBeInTheDocument();
    });

    it('renders textbox', () => {
        renderComponent(true);

        expect(screen.getByPlaceholderText('Notes...')).toBeInTheDocument();
    });

    it('renders buttons', () => {
        renderComponent(true);

        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
});