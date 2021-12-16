/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react'; // avoid circular dependency
import AppContextSettings from './app-context-settings';
import { useSettings } from '../../../services/settings.hooks';

describe('app context auth', () => {
  it('renders simple text as children', () => {
    render(<AppContextSettings>hello</AppContextSettings>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('provides the settings object to child components', () => {
    const TestComponent = () => {
      const settings = useSettings();
      return <p>test: {settings.darkMode ? 'dark' : 'light'}</p>;
    };
    render(
      <AppContextSettings>
        <TestComponent />
      </AppContextSettings>
    );
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(/light/)).toBeInTheDocument();
  });
});
