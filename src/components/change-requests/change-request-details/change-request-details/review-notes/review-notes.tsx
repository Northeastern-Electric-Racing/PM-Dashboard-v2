/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import PageBlock from "../../../../shared/page-block/page-block";

interface ReviewNotesProps {
  reviewNotes?: string
}

const ReviewNotes: React.FC<ReviewNotesProps> = ({
  reviewNotes
}: ReviewNotesProps) => {
  return (
    <PageBlock
      title={'Review Notes'}
      headerRight={<></>}
      body={
        <p>{reviewNotes ? reviewNotes : 'There are no review notes for this change request.'}</p>
      }
    />
  );
};

export default ReviewNotes;
