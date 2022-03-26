/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import StandardFormFields from './standard-form-fields';

const whatStr = 'What';
const whyStr = 'Why';
const scopeImpactStr = 'Scope Impact';
const budgetImpactStr = 'Budget Impact';
const timelineImpactStr = 'Timeline Impact';
const documentationStr = 'Documentation Link';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (handleChange: jest.Mock<any, any>) => {
  return render(<StandardFormFields handleChange={handleChange} />);
};

describe('new change request page', () => {
  it('renders the What form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(whatStr)).toBeInTheDocument();
  });

  it('renders the Scope Impact form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(scopeImpactStr)).toBeInTheDocument();
  });

  it('renders the Budget Impact form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(budgetImpactStr)).toBeInTheDocument();
  });

  it('renders the Timeline Impact form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(timelineImpactStr)).toBeInTheDocument();
  });

  it('renders the Why form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(whyStr)).toBeInTheDocument();
  });

  it('renders the Documentation Link form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(documentationStr)).toBeInTheDocument();
  });
});
