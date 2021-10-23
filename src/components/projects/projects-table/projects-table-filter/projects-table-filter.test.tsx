/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../test-support/test-utils';
import ProjectsTableFilter from './projects-table-filter';

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  render(<ProjectsTableFilter onClick={() => {}} />);
};

describe('projects table filter component', () => {
  it('checking that title and labels are there', async () => {
    renderComponent();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Car Number')).toBeInTheDocument();
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Project Lead')).toBeInTheDocument();
    expect(screen.getByText('Project Manager')).toBeInTheDocument();
    expect(screen.getByText('Year Created')).toBeInTheDocument();
  });
});
