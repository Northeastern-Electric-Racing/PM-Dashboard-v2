/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { exampleAllWorkPackages } from '../../../../test-support/test-data/work-packages.stub';
import { exampleAllProjects } from '../../../../test-support/test-data/projects.stub';
import { render, screen, routerWrapperBuilder } from '../../../../test-support/test-utils';
import { ChangeRequestType } from 'utils';
import NewChangeRequestPage from './new-change-request-page';

const whoDesignInquiry = 'Who is Required for Design Review?';
const projectLeadStr = 'Project Lead';
const scopeImpactStr = 'Scope Impact';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (formType: ChangeRequestType) => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <NewChangeRequestPage
        submitHandler={jest.fn()}
        setType={jest.fn()}
        formType={formType}
        projectData={exampleAllProjects}
        workPkgsData={exampleAllWorkPackages}
        handleChange={jest.fn()}
        handleStartDateChange={jest.fn()}
      />
    </RouterWrapper>
  );
};

describe('new change request page', () => {
  it('checks if page renders correctly with redefinition type', () => {
    renderComponent(ChangeRequestType.Redefinition);
    expect(screen.queryByText(whoDesignInquiry)).not.toBeInTheDocument();
    expect(screen.queryByText(projectLeadStr)).not.toBeInTheDocument();
    expect(screen.getByText(scopeImpactStr)).toBeInTheDocument();
  });

  it('checks if page renders correctly with issue type', () => {
    renderComponent(ChangeRequestType.Issue);
    expect(screen.queryByText(whoDesignInquiry)).not.toBeInTheDocument();
    expect(screen.queryByText(projectLeadStr)).not.toBeInTheDocument();
    expect(screen.getByText(scopeImpactStr)).toBeInTheDocument();
  });

  it('checks if page renders correctly with stage gate type', () => {
    renderComponent(ChangeRequestType.StageGate);
    expect(screen.queryByText(scopeImpactStr)).not.toBeInTheDocument();
    expect(screen.queryByText(projectLeadStr)).not.toBeInTheDocument();
    expect(screen.getByText(whoDesignInquiry)).toBeInTheDocument();
  });

  it('checks if page renders correctly with activation type', () => {
    renderComponent(ChangeRequestType.Activation);
    expect(screen.queryByText(scopeImpactStr)).not.toBeInTheDocument();
    expect(screen.queryByText(whoDesignInquiry)).not.toBeInTheDocument();
    expect(screen.getByText(projectLeadStr)).toBeInTheDocument();
  });
});
