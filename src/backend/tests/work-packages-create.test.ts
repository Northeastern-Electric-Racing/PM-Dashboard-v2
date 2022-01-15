/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { createWorkPackage, handler } from '../functions/work-packages-create';

describe('work package create', () => {
  describe('handler', () => {
    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validate inputs', () => {
      const goodBody = {
        userId: 1,
        name: 'name',
        projectId: 1,
        startDate: '2015-10-06',
        duration: 1,
        wbsElementIds: [1],
        expectedActivities: [1],
        deliverables: [1]
      };

      it('fails when empty body', async () => {
        const res = await func({ body: {} });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when invalid user id', async () => {
        const res = await func({ body: { ...goodBody, userId: -5 } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when wbsElementIds has non numbers', async () => {
        const res = await func({ body: { ...goodBody, wbsElementIds: ['abc', 'def'] } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
