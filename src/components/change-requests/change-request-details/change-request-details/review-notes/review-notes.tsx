/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { User } from 'utils';
import { datePipe, emDashPipe, fullNamePipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';

interface ReviewNotesProps {
  reviewer?: User;
  reviewNotes?: string;
  dateReviewed?: Date;
}

const ReviewNotes: React.FC<ReviewNotesProps> = ({
  reviewer,
  reviewNotes,
  dateReviewed
}: ReviewNotesProps) => {
  return (
    <PageBlock
      title={'Review Notes'}
      headerRight={
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id="tooltip">
              {'Reviewed on: ' + (dateReviewed ? datePipe(dateReviewed) : emDashPipe(''))}
            </Tooltip>
          }
        >
          <span>{fullNamePipe(reviewer)}</span>
        </OverlayTrigger>
      }
      body={
        <p>{reviewNotes ? reviewNotes : 'There are no review notes for this change request.'}</p>
      }
    />
  );
};

export default ReviewNotes;
