/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { StageGateChangeRequest } from "utils";
import { booleanPipe, dollarsPipe } from "../../../../../../shared/pipes";
import PageBlock from "../../../../../shared/page-block/page-block";

interface StageGateDetailsProps {
  cr: StageGateChangeRequest
}

const StageGateDetails: React.FC<StageGateDetailsProps> = ({
  cr
}: StageGateDetailsProps) => {
  return (
    <PageBlock
      title={'Stage Gate Change Request Details'}
      headerRight={<></>}
      body={
        <dl className="row">
          <dt className="col-4">Confirm WP Completed</dt>
          <dd className="col">{booleanPipe(cr.confirmDone)}</dd>
          <div className="w-100"></div>
          <dt className="col-4">Leftover Budget</dt>
          <dd className="col">{dollarsPipe(cr.leftoverBudget)}</dd>
        </dl>
      }
    />
  );
}

export default StageGateDetails;
