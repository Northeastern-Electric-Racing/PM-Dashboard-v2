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
  render(
    <ProjectsTableFilter
      onClick={mockOnClick}
      leads={['Amy Smith', 'Joe Blow']}
      managers={['Joe Blow', 'Rachel Barmatha', 'Joe Schmoe']}
    />
  );
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

  it('checking if car number dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[4]).toBe('');
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-1'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[4]).toBe('1');
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-none'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[4]).toBe('');
  });

  it('checking if status dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[0]).toBe('');
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-active'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[0]).toBe('Active');
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-none'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[0]).toBe('');
  });

  it('checking if project lead dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[2]).toBe('');
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-Amy Smith'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[2]).toBe('Amy Smith');
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-none'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[2]).toBe('');
  });

  it('checking if project manager dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[3]).toBe('');
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-Joe Blow'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[3]).toBe('Joe Blow');
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-none'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[3]).toBe('');
  });

  it('checking if year dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[1]).toBe('');
    await act(async () => {
      fireEvent.click(screen.getByTestId('year-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('year-2020'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[1]).toBe('2020');
    await act(async () => {
      fireEvent.click(screen.getByTestId('year-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('year-none'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('apply-button'));
    });
    expect(temp[1]).toBe('');
  });
});
