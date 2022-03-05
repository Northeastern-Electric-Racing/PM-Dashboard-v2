/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import StageGateFormFields from './stage-gate-form-fields';

const requiredInquiry = 'Who is Required for Design Review?';
const leftoverBudgetStr = 'Leftover Budget';
const doneInquiry = 'Is everything done?';
/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (handleChange: jest.Mock<any, any>) => {
  return render(<StageGateFormFields handleChange={handleChange}/>);
};

describe('new stage gate form fields', () => {
  it('renders the design reviewer form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(requiredInquiry)).toBeInTheDocument();
  });

  it('renders the Leftover Budget form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(leftoverBudgetStr)).toBeInTheDocument();
  });

  it('renders the status form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(doneInquiry)).toBeInTheDocument();
  });
});
