/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { EditModeContext } from '../work-package-container';
import WorkPackageButtons from './work-package-buttons';

describe('Work package edit buttons', () => {
  it('renders all of the buttons, with edit mode enabled', () => {
    render(
      <EditModeContext.Provider value={false}>
        <WorkPackageButtons changeEditMode={() => {}} />
      </EditModeContext.Provider>
    );
    expect(screen.getByText('New Change Request')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
  });
  it('renders all of the buttons, with edit mode disabled', () => {
    render(
      <EditModeContext.Provider value={true}>
        <WorkPackageButtons changeEditMode={() => {}} />
      </EditModeContext.Provider>
    );
    expect(screen.getByText('New Change Request')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeDisabled();
  });
});
