/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { exampleProject1 } from 'utils';
import ProjectContainer from './project-container';

const endpointURL: string = '/.netlify/functions/change-requests';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(endpointURL, (req, res, ctx) => {
    return res(ctx.json(exampleProject1));
  })
);

// Sets up the component under test with the desired values and renders it.
const renderComponent: () => void = () => {
  render(<ProjectContainer wbsNum={{ car: 1, project: 1, workPackage: 0 }} />);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Rendering Project Container', () => {
  it('renders the correct data', async () => {
    renderComponent();
    expect(screen.getByText('1.1.0 - Impact Attenuator')).toBeInTheDocument();
    expect(screen.getByText('Work Packages')).toBeInTheDocument();
    expect(screen.getByText('Bodywork Concept of Design')).toBeInTheDocument();
  });
});
