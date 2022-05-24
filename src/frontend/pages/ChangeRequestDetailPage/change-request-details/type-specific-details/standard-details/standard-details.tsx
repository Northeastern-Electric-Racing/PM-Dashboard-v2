/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequestExplanation, StandardChangeRequest } from 'utils';
import { weeksPipe, dollarsPipe } from '../../../../../../shared/pipes';
import PageBlock from '../../../../../layouts/page-block/page-block';

interface StandardDetailsProps {
  cr: StandardChangeRequest;
}

const StandardDetails: React.FC<StandardDetailsProps> = ({ cr }: StandardDetailsProps) => {
  return (
    <PageBlock
      title={'Standard Change Request Details'}
      headerRight={<></>}
      body={
        <dl className="row">
          <dt className="col-2">What</dt>
          <dd className="col-auto">{cr.what}</dd>
          <div className="w-100"></div>
          <dt className="col-2">Why</dt>
          <dd className="col">
            <dl>
              {cr.why.map((ele: ChangeRequestExplanation, idx: number) => (
                <div key={idx} className="row w-100">
                  <dt className="col-3">{ele.type}</dt>
                  <dd className="col">{ele.explain}</dd>
                </div>
              ))}
            </dl>
          </dd>
          <div className="w-100"></div>
          <dt className="col-2">Impact</dt>
          <dd className="col-auto">
            <dl className="row">
              <dt className="col-3">Scope Impact</dt>
              <dd className="col-auto">{cr.scopeImpact}</dd>
              <div className="w-100"></div>
              <dt className="col-3">Timeline Impact</dt>
              <dd className="col-auto">{weeksPipe(cr.timelineImpact)}</dd>
              <div className="w-100"></div>
              <dt className="col-3">Budget Impact</dt>
              <dd className="col-auto">{dollarsPipe(cr.budgetImpact)}</dd>
            </dl>
          </dd>
        </dl>
      }
    />
  );
};

export default StandardDetails;
