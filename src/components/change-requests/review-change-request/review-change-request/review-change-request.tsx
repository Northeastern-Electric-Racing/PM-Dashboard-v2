/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
  ChangeRequest,
  StandardChangeRequest,
  ActivationChangeRequest,
  StageGateChangeRequest,
  ChangeRequestType,
  ChangeRequestExplanation
} from 'utils';
import PageBlock from "../../../shared/page-block/page-block";
import PageTitle from "../../../shared/page-title/page-title";

interface ReviewChangeRequestViewProps {
  crId: number,
  accepted: boolean
}

const ReviewChangeRequestsView: React.FC<ReviewChangeRequestViewProps> = ({
  crId,
  accepted
}: ReviewChangeRequestViewProps) => {
  const history = useHistory();

  const handleConfirm = () => {
    // temporary redirect to change requests table
    history.push(`/change-requests/`);
  };

  const handleCancel = () => {
    // redirect to the details page if canceled
    history.push(`/change-requests/${crId}`);
  }

  return (
    <>
      <PageTitle title={`Change Request #${crId}`} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <div className={'row'}>
            <div className={'mx-auto mw-50'}>
              <h2 className={'text-center mb-3'}>{accepted ? 'Accept' : 'Deny'} Change Request</h2>
              <Form id={'formReview'}>
                <div className={'row'}>
                  <Form.Group controlId='formReviewNotes'>
                    <Form.Label className={'font-weight-bold'}>Review Notes</Form.Label>
                    <Form.Control as='textarea' rows={4} cols={50} placeholder='Notes...' />
                  </Form.Group>
                </div>
                <div className={'row justify-content-end'}>
                  <Button variant='danger' type='button' onClick={() => handleCancel()}>
                    Cancel
                  </Button>
                  <Button className={'ml-3'} variant='success' type='button' onClick={() => handleConfirm()}>
                    Confirm
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        }
      />
    </>
  );
};

export default ReviewChangeRequestsView;