/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../test-support/test-utils';
import ProjectsTableFilter from './projects-table-filter';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

let temp: string[] = [];

const mockOnClick = (
  status: string,
  year: string,
  projectLead: string,
  projectManager: string,
  carNumber: string
) => {
  temp = [];
  temp.push(status);
  temp.push(year);
  temp.push(projectLead);
  temp.push(projectManager);
  temp.push(carNumber);
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  render(<ProjectsTableFilter onClick={mockOnClick} leads={[]} managers={[]} />);
};

describe('projects table filter component', () => {
  it('checking that title and labels are there', async () => {
    act(() => {
      renderComponent();
    });
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Car Number')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Project Lead')).toBeInTheDocument();
    expect(screen.getByText('Project Manager')).toBeInTheDocument();
    expect(screen.getByText('Year Created')).toBeInTheDocument();
  });

  it('checking if data in the car dropdown menu is displayed properly', async () => {
    act(() => {
      renderComponent();
      fireEvent.click(screen.getByTestId('car-num-toggle'));
    });
    expect(screen.getByTestId('car-num-menu')).toHaveTextContent('1');
    expect(screen.getByTestId('car-num-menu')).toHaveTextContent('2');
  });
});
