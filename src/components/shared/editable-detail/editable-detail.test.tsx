/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../test-support/test-utils';
import EditableDetail from './editable-detail';
// commented out because this code was added in the last pull request made by @Zach Roth;
// as such it does not exist in this branch
// import { EditModeContext } from '../../projects/wbs-details/work-package-container/work-package-container';
import { EditModeContext } from '../../projects/project-edit-form/project-edit-container/project-edit-container';

describe('Rendering Editable Detail Component', () => {
  const renderComponent = (editMode: boolean, readOnly?: boolean) => {
    return render(
      <EditModeContext.Provider value={editMode}>
        <EditableDetail
          title="testTitle"
          value="testValue"
          readOnly={readOnly}
          suffix="testSuffix"
          type="text"
        />
      </EditModeContext.Provider>
    );
  };

  it('renders the content with edit mode disabled', () => {
    renderComponent(false);
    expect(screen.getByText('testTitle:')).toBeInTheDocument();
    expect(screen.getByText('testValue testSuffix')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('testValue')).not.toBeInTheDocument();
  });

  it('renders the content with edit mode enabled', () => {
    renderComponent(true);
    expect(screen.getByText('testTitle:')).toBeInTheDocument();
    expect(screen.queryByText('testValue')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('testValue')).toBeInTheDocument();
    expect(screen.queryByText('testSuffix')).toBeInTheDocument();
  });
  it('renders the content with edit mode enabled and readOnly mode enabled', () => {
    renderComponent(true, true);
    expect(screen.getByText('testTitle:')).toBeInTheDocument();
    expect(screen.getByText('testValue testSuffix')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('testValue')).not.toBeInTheDocument();
  });
});
