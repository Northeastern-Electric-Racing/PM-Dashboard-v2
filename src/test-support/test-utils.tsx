/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { routes } from '../shared/routes';
import AppContext from '../components/app/app-context/app-context';

// Regular Expression to match WBS Numbers
const wbsRegex: RegExp = /[1-2]\.([1-9]{1}([0-9]{1})?)\.[0-9]{1,2}/;

// mostly for services hooks tests
const queryClientProviderWrapper = ({ children }: any) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

// to allow configuring paths/routes within tests
const routerWrapperBuilder = ({ path = routes.HOME, route = routes.HOME }) => {
  const RouterWrapper: React.FC = ({ children }) => {
    return (
      <MemoryRouter initialEntries={[route]}>
        <Route path={path}>{children}</Route>
      </MemoryRouter>
    );
  };
  return RouterWrapper;
};

// always provide contexts and providers in test renders
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AppContext, ...options });

export * from '@testing-library/react';

export { wbsRegex, queryClientProviderWrapper, routerWrapperBuilder, customRender as render };
