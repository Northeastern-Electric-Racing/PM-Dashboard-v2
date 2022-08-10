/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { reviewChangeRequest, handler } from '../functions/change-requests-review';

describe('change requests review', () => {
  describe('handler', () => {
    // TODO: these tests all work because validation catches and
    //       database access prisma code is never reached.
    //       this is not good practice because we should be mocking out the db code

    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validates review body', () => {
      const goodReviewBody = {
        crId: 1,
        reviewNotes: 'just a short little string',
        accepted: true
      };

      it('fails when empty body', async () => {
        const res = await func({ body: {} });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when crId is not number', async () => {
        const res = await func({ body: { ...goodReviewBody, crId: 'hi' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when reviewNotes is not string', async () => {
        // NOTE: numbers and booleans get stringified and not converted back
        //       so numbers and booleans do not fail validation, so object is used instead
        const res = await func({ body: { ...goodReviewBody, reviewNotes: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when accepted is not boolean', async () => {
        const res = await func({ body: { ...goodReviewBody, accepted: 5 } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });

  describe('review function', () => {
    const func = async (event: any) => {
      return reviewChangeRequest(event, mockContext, () => {});
    };

    const sampleReviewBody = {
      crId: 0,
      reviewNotes: 'just a short little string',
      accepted: false
    };

    it.skip('fails when change request does not exist', async () => {
      const res = await func({ body: sampleReviewBody });
      expect(res.statusCode).toBe(404);
      expect(res.body).toBe('Could not find the requested change request [#0].');
    });
  });
});
