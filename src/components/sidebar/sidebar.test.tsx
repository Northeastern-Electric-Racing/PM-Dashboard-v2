import { render, screen } from '@testing-library/react';
import { Project } from 'utils';
import Sidebar from "./sidebar";

it('Renders All Button Text', () => {
    render(<Sidebar />);
    const homeButton = screen.getByText("Home");
    expect(homeButton).toBeInTheDocument();
    const ganttButton = screen.getByText("Gantt");
    expect(ganttButton).toBeInTheDocument();
    const projectsButton = screen.getByText("Projects");
    expect(projectsButton).toBeInTheDocument();
    const CRButton = screen.getByText("Change Requests");
    expect(CRButton).toBeInTheDocument();
    const reportsButton = screen.getByText("Reports");
    expect(reportsButton).toBeInTheDocument();
    const helpButton = screen.getByText("Help");
    expect(helpButton).toBeInTheDocument();
});

