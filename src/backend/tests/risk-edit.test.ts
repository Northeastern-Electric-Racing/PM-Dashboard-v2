/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/risk-edit';

describe('work package edit', () => {
  describe('handler', () => {
    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validate inputs', () => {
      const goodBody = {
        id: 1,
        userId: 1,
        detail: 'risk #1',
        resolved: true
      };

      it('fails when there is no risk id', async () => {
        const { id, ...rest } = goodBody;
        const res = await func({ body: rest });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when the invalid user is trying to edit risk', async () => {
        const res = await func({ body: { ...goodBody, userId: -5 } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
