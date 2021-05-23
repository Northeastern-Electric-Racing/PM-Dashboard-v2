/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

// Regular Expression to match WBS Numbers
export const wbsRegex: RegExp = /[1-2]\.([1-9]{1}([0-9]{1})?)\.[0-9]{1,2}/;

/**
 * Render a React component wrapped in a memory router for testing.
 *
 * @param ui React component under test
 * @param options Path to place component and route to navigate to (both optional)
 */
export const renderWithRouter = (ui: ReactElement, { path = '/', route = '/' }) => {
  const toRender: ReactElement = (
    <MemoryRouter initialEntries={[route]}>
      <Route path={path}>{ui}</Route>
    </MemoryRouter>
  );
  render(toRender);
};
