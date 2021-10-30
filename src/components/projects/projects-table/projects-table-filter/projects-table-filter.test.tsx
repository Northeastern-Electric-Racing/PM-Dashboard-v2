/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, act, fireEvent } from '../../../../test-support/test-utils';
import ProjectsTableFilter from './projects-table-filter';
import React from 'react';

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
    renderComponent();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Car Number')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Project Lead')).toBeInTheDocument();
    expect(screen.getByText('Project Manager')).toBeInTheDocument();
    expect(screen.getByText('Year Created')).toBeInTheDocument();
  });

  it('checking if data in the car dropdown menu is correct', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-toggle'));
    });
    expect(screen.getByTestId('car-num-menu')).toHaveTextContent('None');
    expect(screen.getByTestId('car-num-menu')).toHaveTextContent('1');
    expect(screen.getByTestId('car-num-menu')).toHaveTextContent('2');
  });

  it('checking if data in the status dropdown menu is correct', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-toggle'));
    });
    expect(screen.getByTestId('status-menu')).toHaveTextContent('None');
    expect(screen.getByTestId('status-menu')).toHaveTextContent('Active');
    expect(screen.getByTestId('status-menu')).toHaveTextContent('Inactive');
    expect(screen.getByTestId('status-menu')).toHaveTextContent('Complete');
  });

  it('checking if data in the project lead dropdown menu is correct', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-toggle'));
    });
    expect(screen.getByTestId('lead-menu')).toHaveTextContent('None');
  });

  it('checking if data in the project manager dropdown menu is correct', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-toggle'));
    });
    expect(screen.getByTestId('manager-menu')).toHaveTextContent('None');
  });

  it('checking if data in the year dropdown menu is correct', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('year-toggle'));
    });
    expect(screen.getByTestId('year-menu')).toHaveTextContent('None');
    expect(screen.getByTestId('year-menu')).toHaveTextContent('2020');
    expect(screen.getByTestId('year-menu')).toHaveTextContent('2021');
  });

  it('checking if text in the apply button is correct', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(screen.getByTestId('apply-button')).toHaveTextContent('Apply');
  });
});
