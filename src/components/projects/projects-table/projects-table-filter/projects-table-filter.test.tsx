/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { act, fireEvent, render, screen } from '../../../../test-support/test-utils';
import ProjectsTableFilter from './projects-table-filter';
import {
  exampleAdminUser,
  exampleLeadershipUser,
  exampleProjectLeadUser,
  exampleProjectManagerUser
} from '../../../../test-support/test-data/users.stub';

let temp: any[] = [];

const mockOnClick = (
  status: string,
  projectLead: number,
  projectManager: number,
  carNumber: number
) => {
  temp = [];
  temp.push(status);
  temp.push(projectLead);
  temp.push(projectManager);
  temp.push(carNumber);
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  render(
    <ProjectsTableFilter
      onClick={mockOnClick}
      leads={[exampleProjectLeadUser, exampleLeadershipUser]}
      managers={[exampleLeadershipUser, exampleProjectManagerUser, exampleAdminUser]}
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
  });

  it('checking if data in the car dropdown menu is correct', async () => {
    renderComponent();
    expect(screen.queryByText('None')).not.toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-toggle'));
    });
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('checking if data in the status dropdown menu is correct', async () => {
    renderComponent();
    expect(screen.queryByText('None')).not.toBeInTheDocument();
    expect(screen.queryByText('ACTIVE')).not.toBeInTheDocument();
    expect(screen.queryByText('INACTIVE')).not.toBeInTheDocument();
    expect(screen.queryByText('COMPLETE')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-toggle'));
    });
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    expect(screen.getByText('INACTIVE')).toBeInTheDocument();
    expect(screen.getByText('COMPLETE')).toBeInTheDocument();
  });

  it('checking if data in the project lead dropdown menu is correct', async () => {
    renderComponent();
    expect(screen.queryByText('None')).not.toBeInTheDocument();
    expect(screen.queryByText('Amy Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Joe Blow')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-toggle'));
    });
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('Amy Smith')).toBeInTheDocument();
    expect(screen.getByText('Joe Blow')).toBeInTheDocument();
  });

  it('checking if data in the project manager dropdown menu is correct', async () => {
    renderComponent();
    expect(screen.queryByText('None')).not.toBeInTheDocument();
    expect(screen.queryByText('Joe Blow')).not.toBeInTheDocument();
    expect(screen.queryByText('Rachel Barmatha')).not.toBeInTheDocument();
    expect(screen.queryByText('Joe Schmoe')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-toggle'));
    });
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('Joe Blow')).toBeInTheDocument();
    expect(screen.getByText('Rachel Barmatha')).toBeInTheDocument();
    expect(screen.getByText('Joe Shmoe')).toBeInTheDocument();
  });

  it('checking if text in the apply button is correct', async () => {
    renderComponent();
    expect(screen.getByText('Apply')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    }); // Clicking it should do nothing to its visibility, not change the page, etc.
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('checking if car number dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[3]).toBe(-1);
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('1'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[3]).toBe(1);
    await act(async () => {
      fireEvent.click(screen.getByTestId('car-num-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('None'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[3]).toBe(-1);
  });

  it('checking if status dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[0]).toBe('');
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('ACTIVE'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[0]).toBe('ACTIVE');
    await act(async () => {
      fireEvent.click(screen.getByTestId('status-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('None'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[0]).toBe('');
  });

  it('checking if project lead dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[1]).toBe(-1);
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Amy Smith'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[1]).toBe(4);
    await act(async () => {
      fireEvent.click(screen.getByTestId('lead-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('None'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[1]).toBe(-1);
  });

  it('checking if project manager dropdown sets filter setting correctly', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[2]).toBe(-1);
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Joe Blow'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[2]).toBe(3);
    await act(async () => {
      fireEvent.click(screen.getByTestId('manager-toggle'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('None'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Apply'));
    });
    expect(temp[2]).toBe(-1);
  });
});
