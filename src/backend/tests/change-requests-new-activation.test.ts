/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/change-requests-new-activation';

describe('change requests new', () => {
  describe('handler', () => {
    // TODO: these tests all work because validation catches and
    //       database access prisma code is never reached.
    //       this is not good practice because we should be mocking out the db code

    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validates activation CR', () => {
      const goodActivationBody = {
        submitterId: 1,
        wbsElementId: 1,
        type: 'ACTIVATION',
        projectLeadId: 2,
        projectManagerId: 3,
        confirmDetails: true
      };

      it('fails when projectLeadId is not number', async () => {
        const res = await func({ body: { ...goodActivationBody, projectLeadId: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when projectManagerId is not number', async () => {
        const res = await func({ body: { ...goodActivationBody, projectManagerId: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when confirmDetails is not boolean', async () => {
        const res = await func({ body: { ...goodActivationBody, confirmDetails: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
