/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { baseHandler, handler } from '../functions/change-request-new';

describe('change request new', () => {
  describe('handler', () => {
    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validates standard CR', () => {
      const goodStandardBody = {
        submitterId: 1,
        wbsElementId: 1,
        type: 'OTHER',
        what: 'some string right here',
        scopeImpact: 'not a whole lot more other than another string',
        timelineImpact: 2,
        budgetImpact: 0,
        why: [{ type: 'SCHOOL', explain: 'just a few dozen midterms' }]
      };

      it('fails when empty body', async () => {
        const res = await func({ body: {} });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when submitterId is string', async () => {
        const res = await func({ body: { ...goodStandardBody, submitterId: 'hi' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when wbsElementId is string', async () => {
        const res = await func({ body: { ...goodStandardBody, wbsElementId: 'hi' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });

    describe('validates stage gate CR', () => {
      const goodStageGateBody = {
        submitterId: 1,
        wbsElementId: 1,
        type: 'STAGE_GATE',
        leftoverBudget: 46,
        confirmDone: true
      };
    });

    describe('validates activation CR', () => {
      const goodActivationBody = {
        submitterId: 1,
        wbsElementId: 1,
        type: 'ACTIVATION',
        projectLeadId: 2,
        projectManagerId: 3,
        confirmDetails: true
      };
    });
  });
});
