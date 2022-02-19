import { render, screen } from '../../../../../test-support/test-utils';
import { Project } from 'utils';
import { endDatePipe, fullNamePipe, weeksPipe } from '../../../../../shared/pipes';
import {
  exampleProject1,
  exampleProject2,
  exampleProject3
} from '../../../../../test-support/test-data/projects.stub';
import ProjectEditDetails from './project-edit-details';

describe('Rendering Project Details Component', () => {
  it('renders all the fields, example 1', () => {
    const proj: Project = exampleProject1;
    render(<ProjectEditDetails project={proj} />);
    expect(screen.getByText(`Project Details`)).toBeInTheDocument();
    expect(screen.getByText(`${proj.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(proj.projectLead)}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(proj.projectManager)}`, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(proj.duration)}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText('01/01/21', { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${endDatePipe(new Date('01/01/21'), proj.duration)}`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(`${proj.slideDeckLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.gDriveLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.bomLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.taskListLink}%`, { exact: false })).toBeInTheDocument();
  });

  it('renders all the fields, example 2', () => {
    const proj: Project = exampleProject2;
    render(<ProjectEditDetails project={proj} />);
    expect(screen.getByText(`Project Details`)).toBeInTheDocument();
    expect(screen.getByText(`${proj.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(proj.projectLead)}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(proj.projectManager)}`, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(proj.duration)}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText('mm/dd/yyyy', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('mm/dd/yyyy', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.slideDeckLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.gDriveLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.bomLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.taskListLink}%`, { exact: false })).toBeInTheDocument();
  });

  it('renders all the fields, example 3', () => {
    const proj: Project = exampleProject3;
    render(<ProjectEditDetails project={proj} />);
    expect(screen.getByText(`Project Details`)).toBeInTheDocument();
    expect(screen.getByText(`${proj.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(proj.projectLead)}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(proj.projectManager)}`, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(proj.duration)}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText('01/01/21', { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${endDatePipe(new Date('01/01/21'), proj.duration)}`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(`${proj.slideDeckLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.gDriveLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.bomLink}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${proj.taskListLink}%`, { exact: false })).toBeInTheDocument();
  });
});
