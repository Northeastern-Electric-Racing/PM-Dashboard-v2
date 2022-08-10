/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/change-requests-new-stage-gate';

describe('change requests new', () => {
  describe('handler', () => {
    // TODO: these tests all work because validation catches and
    //       database access prisma code is never reached.
    //       this is not good practice because we should be mocking out the db code

    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validates stage gate CR', () => {
      const goodStageGateBody = {
        submitterId: 1,
        wbsElementId: 1,
        type: 'STAGE_GATE',
        leftoverBudget: 46,
        confirmDone: true
      };

      it('fails when leftoverBudget is not number', async () => {
        const res = await func({ body: { ...goodStageGateBody, leftoverBudget: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when confirmDone is not boolean', async () => {
        const res = await func({ body: { ...goodStageGateBody, confirmDone: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
