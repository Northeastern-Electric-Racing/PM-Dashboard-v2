/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../shared/test-utils';
import WBSDetails from './wbs-details';

/**
 * Sets up the component under test with the desired values and renders it.
 *
 * @param options WBS number to render the component at
 */
const renderComponent = (wbsOverride?: string) => {
  const wbsNumber: string = wbsOverride || '1.1.1';
  renderWithRouter(WBSDetails, { path: '/projects/:wbsNum', route: `/projects/${wbsNumber}` });
};

describe('wbs element details component', () => {
  test('renders the page title', () => {
    renderComponent();
    expect(screen.getByText(/WBS Page/i)).toBeInTheDocument();
  });

  test('renders the wbs element number title', () => {
    const wbsNumToRender: string = '1.8.1';
    renderComponent(wbsNumToRender);
    expect(screen.getByText(wbsNumToRender, { exact: false })).toBeInTheDocument();
  });

  test('renders 1.1.0 as a project', () => {
    const wbsNumToRender: string = '1.1.0';
    renderComponent(wbsNumToRender);
    expect(screen.getByText(`Project ${wbsNumToRender}`)).toBeInTheDocument();
  });

  test('renders 2.18.7 as a work package', () => {
    const wbsNumToRender: string = '2.18.7';
    renderComponent(wbsNumToRender);
    expect(screen.getByText(`Work Package ${wbsNumToRender}`)).toBeInTheDocument();
  });
});
