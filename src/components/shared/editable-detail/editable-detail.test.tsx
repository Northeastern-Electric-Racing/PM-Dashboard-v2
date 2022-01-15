/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../test-support/test-utils';
import EditableDetail from './editable-detail';
import { EditModeContext } from '../../projects/wbs-details/work-package-container/work-package-container';

describe('Rendering Editable Detail Component', () => {
  it('renders the content with edit mode disabled', () => {
    render(
      <EditModeContext.Provider value={false}>
        <EditableDetail
          title="testTitle"
          value="testValue"
          readOnly={false}
          suffix="testSuffix"
          type="text"
        />
      </EditModeContext.Provider>
    );
    expect(screen.getByText('testTitle:')).toBeInTheDocument();
    expect(screen.getByText('testValue testSuffix')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('testValue')).not.toBeInTheDocument();
  });

  it('renders the content with edit mode enabled', () => {
    render(
      <EditModeContext.Provider value={true}>
        <EditableDetail
          title="testTitle"
          value="testValue"
          readOnly={false}
          suffix="testSuffix"
          type="text"
        />
      </EditModeContext.Provider>
    );
    expect(screen.getByText('testTitle:')).toBeInTheDocument();
    expect(screen.queryByText('testValue')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('testValue')).toBeInTheDocument();
    expect(screen.queryByText('testSuffix')).toBeInTheDocument();
  });
  it('renders the content with edit mode enabled and readOnly mode enabled', () => {
    render(
      <EditModeContext.Provider value={false}>
        <EditableDetail
          title="testTitle"
          value="testValue"
          readOnly={false}
          suffix="testSuffix"
          type="text"
        />
      </EditModeContext.Provider>
    );
    expect(screen.getByText('testTitle:')).toBeInTheDocument();
    expect(screen.getByText('testValue testSuffix')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('testValue')).not.toBeInTheDocument();
  });
});
