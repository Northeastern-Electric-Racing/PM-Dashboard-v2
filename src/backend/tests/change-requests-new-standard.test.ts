/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { exampleWbs1 } from '../../test-support/test-data/wbs-numbers.stub';
import { handler } from '../functions/change-requests-new-standard';

describe('change requests new standard', () => {
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
        wbsNum: exampleWbs1,
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

      it('fails when wbsNum is not a wbsNumber', async () => {
        const res = await func({ body: { ...goodStandardBody, wbsNum: 'hi' } });
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
  });
});
