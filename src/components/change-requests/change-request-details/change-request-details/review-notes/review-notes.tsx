/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from 'utils';
import { fullNamePipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';

interface ReviewNotesProps {
  reviewer?: User;
  reviewNotes?: string;
}

const ReviewNotes: React.FC<ReviewNotesProps> = ({ reviewer, reviewNotes }: ReviewNotesProps) => {
  return (
    <PageBlock
      title={'Review Notes'}
      headerRight={<>{fullNamePipe(reviewer)}</>}
      body={
        <p>{reviewNotes ? reviewNotes : 'There are no review notes for this change request.'}</p>
      }
    />
  );
};

export default ReviewNotes;
