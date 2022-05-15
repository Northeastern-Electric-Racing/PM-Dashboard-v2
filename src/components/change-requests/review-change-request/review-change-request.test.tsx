/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { routes } from '../../../shared/routes';
import { exampleStandardChangeRequest } from '../../../test-support/test-data/change-requests.stub';
import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import ReviewChangeRequest from './review-change-request';

const renderComponent = (option: 'Accept' | 'Deny', route: string) => {
  const RouterWrapper = routerWrapperBuilder({ path: routes.CHANGE_REQUESTS_BY_ID, route });
  return render(
    <RouterWrapper>
      <ReviewChangeRequest option={option} />
    </RouterWrapper>
  );
};

describe('review change request', () => {
  it('renders change request review for accepting', () => {
    renderComponent('Accept', `${routes.CHANGE_REQUESTS}/${exampleStandardChangeRequest.crId}`);

    expect(screen.getByText('Accept Change Request')).toBeInTheDocument();
  });

  it('renders change request review for denying', () => {
    renderComponent('Deny', `${routes.CHANGE_REQUESTS}/${exampleStandardChangeRequest.crId}`);

    expect(screen.getByText('Deny Change Request')).toBeInTheDocument();
  });
});
