import { render, screen } from '../../../../../test-support/test-utils';
import EditModeOptions from './edit-mode-options';

describe('Renders edit mode options', () => {
  test('renders all of the buttons', () => {
    render(<EditModeOptions changeEditMode={() => {}} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
