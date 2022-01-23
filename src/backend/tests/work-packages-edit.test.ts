/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/work-packages-edit';

describe('work package edit', () => {
  describe('handler', () => {
    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validate inputs', () => {
      const goodBody = {
        wbsElementId: 1,
        userId: 1,
        name: 'name',
        crId: 2,
        projectId: 1,
        startDate: '2015-10-06',
        duration: 1,
        wbsElementIds: [1],
        expectedActivities: ['abc'],
        deliverables: ['def']
      };

      it('fails when body doesnt have wbsElementId', async () => {
        const { wbsElementId, ...rest } = goodBody;
        const res = await func({ body: rest });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when invalid wbsElementId', async () => {
        const res = await func({ body: { ...goodBody, wbsElementId: -5 } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
