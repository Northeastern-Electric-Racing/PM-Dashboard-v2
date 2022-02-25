import { render, screen } from '../../../../../test-support/test-utils';
import { endDatePipe, fullNamePipe, wbsPipe } from '../../../../../shared/pipes';
import {
  exampleProject1,
  exampleProject2,
  exampleProject3
} from '../../../../../test-support/test-data/projects.stub';
import ProjectEditDetails from './project-edit-details';

const projs = [exampleProject1, exampleProject2, exampleProject3];

describe('Rendering Project Details Component', () => {
  projs.forEach((proj, index) => {
    const startDate =
      proj.workPackages.length > 0
        ? proj.workPackages
            .reduce(
              (min, cur) => (cur.startDate < min ? cur.startDate : min),
              proj.workPackages[0].startDate
            )
            .toLocaleDateString()
        : 'n/a';
    const endDate =
      proj.workPackages.length > 0
        ? endDatePipe(
            proj.workPackages.reduce(
              (min, cur) => (cur.startDate < min ? cur.startDate : min),
              proj.workPackages[0].startDate
            ),
            proj.workPackages.reduce((tot, cur) => tot + cur.duration, 0)
          )
        : 'n/a';

    it(`renders all fields for project ${index}`, async () => {
      render(<ProjectEditDetails project={proj} />);

      expect(screen.getByText('Project Details (EDIT)')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'ACTIVE' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'INACTIVE' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'COMPLETE' })).toBeInTheDocument();

      const textboxInputs = ((await screen.findAllByRole('textbox')) as HTMLInputElement[]).map(
        (input) => input.value
      );
      const numberInputs = ((await screen.findAllByRole(
        'spinbutton'
      )) as HTMLInputElement[]).map((input) => parseInt(input.value));

      // Left column of form
      expect(screen.getByText('Project Name:')).toBeInTheDocument();
      expect(textboxInputs).toContain(proj.name);
      expect(screen.getByText('WBS #:')).toBeInTheDocument();
      expect(textboxInputs).toContain(wbsPipe(proj.wbsNum));
      expect(screen.getByText('Project Lead:')).toBeInTheDocument();
      expect(textboxInputs).toContain(fullNamePipe(proj.projectLead));
      expect(screen.getByText('Project Manager:')).toBeInTheDocument();
      expect(textboxInputs).toContain(fullNamePipe(proj.projectManager));
      expect(screen.getByText('Budget:')).toBeInTheDocument();
      expect(numberInputs).toContain(proj.budget);

      // Right column of form
      expect(screen.getByText('Duration:')).toBeInTheDocument();
      expect(numberInputs).toContain(proj.duration);
      expect(screen.getByText('weeks')).toBeInTheDocument();
      expect(screen.getByText('Start Date:')).toBeInTheDocument();
      // have to do not length 0 in case both start and end date are both 'n/a'
      expect(screen.getAllByPlaceholderText(startDate)).not.toHaveLength(0);
      expect(screen.getByText('End Date:')).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText(endDate)).not.toHaveLength(0);
      expect(screen.getByText('Expected Progress:')).toBeInTheDocument();
      expect(screen.getByText('Timeline Status:')).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText('Not implemented yet')).toHaveLength(2);

      // Links
      expect(screen.getByText('Slide Deck')).toBeInTheDocument();
      expect(textboxInputs).toContain(proj.slideDeckLink!);
      expect(screen.getByText('Task List')).toBeInTheDocument();
      expect(textboxInputs).toContain(proj.taskListLink!);
      expect(screen.getByText('BOM')).toBeInTheDocument();
      expect(textboxInputs).toContain(proj.bomLink!);
      expect(screen.getByText('Google Drive')).toBeInTheDocument();
      expect(textboxInputs).toContain(proj.gDriveLink!);
    });
  });
});
