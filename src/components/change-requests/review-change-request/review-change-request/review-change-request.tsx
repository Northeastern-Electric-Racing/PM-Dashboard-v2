/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { Dispatch, SetStateAction } from 'react';
import { Button, Form } from 'react-bootstrap';
import PageBlock from '../../../shared/page-block/page-block';
import PageTitle from '../../../shared/page-title/page-title';

interface ReviewChangeRequestViewProps {
  crId: number;
  option: 'Accept' | 'Deny';
  onSubmit: (e: any) => any;
  onCancel: (e: any) => any;
  setReviewNotes: Dispatch<SetStateAction<string>>;
}

const ReviewChangeRequestsView: React.FC<ReviewChangeRequestViewProps> = ({
  crId,
  option,
  onSubmit,
  onCancel,
  setReviewNotes
}: ReviewChangeRequestViewProps) => {
  return (
    <div>
      <PageTitle title={`Change Request #${crId}`} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <div className={'row'}>
            <div className={'mx-auto mw-50'}>
              <h2 className={'text-center mb-3'}>{option} Change Request</h2>
              <Form id={'formReview'} onSubmit={onSubmit}>
                <div className={'row'}>
                  <Form.Group controlId="formReviewNotes">
                    <Form.Label className={'font-weight-bold'}>Review Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      cols={50}
                      placeholder="Notes..."
                      onChange={(e: any) => setReviewNotes(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className={'row justify-content-end'}>
                  <Button variant="danger" type="button" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button className={'ml-3'} variant="success" type="submit">
                    Confirm
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ReviewChangeRequestsView;
