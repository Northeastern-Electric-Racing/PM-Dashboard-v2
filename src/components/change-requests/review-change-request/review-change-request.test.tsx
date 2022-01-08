/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ReviewChangeRequest from "./review-change-request";

const renderComponent = (accepted: boolean) => {
    return render(
        <MemoryRouter initialEntries={['change-requests/37']}>
            <Route path='change-requests/:id'>
                <ReviewChangeRequest accepted={accepted} />
            </Route>
        </MemoryRouter>
    );
};

describe('review change request', () => {
    it('renders change request review for accepting', () => {
        renderComponent(true);

        expect(screen.getByText('Accept Change Request')).toBeInTheDocument();
    });

    it('renders change request review for denying', () => {
        renderComponent(false);

        expect(screen.getByText('Deny Change Request')).toBeInTheDocument();
    });
});