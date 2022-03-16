/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageBlock from '../../../shared/page-block/page-block';
import PageTitle from '../../../shared/page-title/page-title';
import { FormInput } from '../review-change-request';
import { reviewNotesSchema } from '../../../shared/form-validation-schemas/change-request-form-schemas';

interface ReviewChangeRequestViewProps {
  crId: number;
  option: 'Accept' | 'Deny';
  onSubmit: (data: FormInput, e: any) => Promise<void>;
  onCancel: (e: any) => any;
}

const ReviewChangeRequestsView: React.FC<ReviewChangeRequestViewProps> = ({
  crId,
  option,
  onSubmit,
  onCancel
}: ReviewChangeRequestViewProps) => {
  const { register, handleSubmit } = useForm<FormInput>({
    resolver: yupResolver(reviewNotesSchema)
  });
  return (
    <>
      <PageTitle title={`Change Request #${crId}`} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <div className={'row'}>
            <div className={'mx-auto mw-50'}>
              <h2 className={'text-center mb-3'}>{option} Change Request</h2>
              <Form id={'formReview'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'row'}>
                  <Form.Group controlId="formReviewNotes">
                    <Form.Label className={'font-weight-bold'}>Review Notes</Form.Label>
                    <Form.Control
                      {...register('reviewNotes')}
                      as="textarea"
                      rows={4}
                      cols={50}
                      placeholder="Notes..."
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
    </>
  );
};

export default ReviewChangeRequestsView;
