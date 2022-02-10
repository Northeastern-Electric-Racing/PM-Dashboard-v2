/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { baseHandler, handler } from '../functions/change-requests-new';

describe('change requests new', () => {
  describe('handler', () => {
    // TODO: these tests all work because validation catches and
    //       database access prisma code is never reached.
    //       this is not good practice because we should be mocking out the db code

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

      it('fails when submitterId is not number', async () => {
        const res = await func({ body: { ...goodStandardBody, submitterId: 'hi' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when wbsElementId is not number', async () => {
        const res = await func({ body: { ...goodStandardBody, wbsElementId: 'hi' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when type is not element in enum', async () => {
        const res = await func({ body: { ...goodStandardBody, type: 'HI' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when what is not string', async () => {
        // NOTE: numbers and booleans get stringified and not converted back
        //       so numbers and booleans do not fail validation, so object is used instead
        const res = await func({ body: { ...goodStandardBody, what: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when scopeImpact is not string', async () => {
        // NOTE: numbers and booleans get stringified and not converted back
        //       so numbers and booleans do not fail validation, so array is used instead
        const res = await func({ body: { ...goodStandardBody, scopeImpact: [] } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when timelineImpact is not number', async () => {
        const res = await func({ body: { ...goodStandardBody, timelineImpact: 'thiis' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when budgetImpact is not number', async () => {
        const res = await func({ body: { ...goodStandardBody, budgetImpact: 'thiis' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when why is not array', async () => {
        const res = await func({ body: { ...goodStandardBody, why: 'thiis' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when why is malformed', async () => {
        // why elements are not objects
        let res = await func({ body: { ...goodStandardBody, why: ['thiis'] } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');

        // why elements missing fields
        res = await func({ body: { ...goodStandardBody, why: [{}] } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');

        // why elements missing type
        res = await func({
          body: { ...goodStandardBody, why: [{ explain: '' }] }
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');

        // why.explain is not string
        res = await func({
          body: { ...goodStandardBody, why: [{ explain: [], type: 'SCHOOL' }] }
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');

        // why.type is not element in enum
        res = await func({
          body: { ...goodStandardBody, why: [{ explain: '[]', type: 'HI' }] }
        });
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

  describe('baseHandler', () => {
    it('returns failure when invalid type', async () => {
      const res = await baseHandler({ body: { type: 'HI' } }, mockContext, () => {});
      const body = JSON.parse(res.body);
      expect(res.statusCode).toBe(400);
      expect(body.message).toBe('Client error: CR type not supported');
    });
  });
});
