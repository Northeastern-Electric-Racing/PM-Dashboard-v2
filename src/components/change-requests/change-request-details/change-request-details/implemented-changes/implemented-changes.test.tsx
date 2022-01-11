/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from "../../../../../test-support/test-utils"
import ImplementedChanges from "./implemented-changes"

const renderComponent = () => {
    return render(<ImplementedChanges />);
}

describe('render implemented changes list', () => {
    it('page block title for implemented changes list', () => {
        renderComponent();

        expect(screen.getByText('Implemented Changes')).toBeInTheDocument();
    });

    // this test will need to be update later once list of changes are connected to the db
    it('page block body for implemented changes list', () => {
        renderComponent();

        expect(screen.getByText('list of changes')).toBeInTheDocument();
    });
});