/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { baseHandler, handler } from '../functions/projects-new';

describe('projects new', () => {
  describe('handler', () => {
    const func = async (event: any) => {
      return await handler(event, mockContext, () => {});
    };

    const goodProjectBody = {
      userId: 1,
      crId: 1,
      name: 'title',
      carNumber: 1,
      summary: 'some summary'
    };

    describe('validates project', () => {
      it('fails with empty body', async () => {
        const res = await func({ body: {} });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when userId is not a number', async () => {
        const res = await func({ body: { ...goodProjectBody, userId: 'ayaya' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when crId is not a number', async () => {
        const res = await func({ body: { ...goodProjectBody, crId: 'hohoho' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when name is not a string', async () => {
        const res = await func({ body: { ...goodProjectBody, name: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when carNumber is not a number', async () => {
        const res = await func({ body: { ...goodProjectBody, carNumber: 'tee hee' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when summary is not a string', async () => {
        const res = await func({ body: { ...goodProjectBody, summary: {} } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });

    describe.skip('base handler', () => {
      const func = async (body: any) => {
        return await baseHandler({ body }, mockContext, () => {});
      };

      it('returns failure when change request not reviewed', async () => {
        const res = await func({ ...goodProjectBody, crId: 4 });
        const body = JSON.parse(res.body);
        expect(res.statusCode).toBe(400);
        expect(body.message).toBe('Client error: Cannot implement an unreviewed change request');
      });

      it('returns failure when change request does not exist', async () => {
        const res = await func({ ...goodProjectBody, crId: 100000 });
        const body = JSON.parse(res.body);
        expect(res.statusCode).toBe(404);
        expect(body.message).toBe('Could not find the requested change request [CR #100000].');
      });
    });
  });
});
