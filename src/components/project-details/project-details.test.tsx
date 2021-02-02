import { render, screen } from '@testing-library/react';
import { Project } from '../../types/project-types';
import ProjectDetails from './project-details';

test('Renders title', () => {
  const exProject: Project = { name: 'Dummy', duration: 4 };
  render(<ProjectDetails project={exProject} />);
  const titleElement = screen.getByText(/Project Details/i);
  expect(titleElement).toBeInTheDocument();
});
