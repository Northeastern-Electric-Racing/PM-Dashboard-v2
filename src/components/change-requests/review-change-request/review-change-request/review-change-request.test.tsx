/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { exampleStandardChangeRequest } from "../../../../test-support/test-data/change-requests.stub";
import { render, screen, routerWrapperBuilder } from "../../../../test-support/test-utils";
import ReviewChangeRequestsView from "./review-change-request";

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (option: 'Accept' | 'Deny') => {
    const RouterWrapper = routerWrapperBuilder({});
    return render(
        <RouterWrapper>
            <ReviewChangeRequestsView crId={exampleStandardChangeRequest.crId} option={option} />
        </RouterWrapper>
    );
};

describe('review change request page', () => {
    it('renders accept title', () => {
        renderComponent('Accept');

        expect(screen.queryByText('Accept Change Request')).toBeInTheDocument();
    });

    it('renders deny title', () => {
        renderComponent('Deny');

        expect(screen.queryByText('Deny Change Request')).toBeInTheDocument();
    });

    it('renders label for textbox', () => {
        renderComponent('Accept');

        expect(screen.getByLabelText('Review Notes')).toBeInTheDocument();
    });

    it('renders textbox', () => {
        renderComponent('Accept');

        expect(screen.getByPlaceholderText('Notes...')).toBeInTheDocument();
    });

    it('renders buttons', () => {
        renderComponent('Accept');

        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
});
