/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import { exampleProject1 } from '../../test-support/test-data/projects.stub';
import { exampleMemberUser } from '../../test-support/test-data/users.stub';
import { handler } from '../functions/risks-create';

describe('risk create', () => {
  describe('handler', () => {
    const func = async (event: any) => {
      return handler(event, mockContext, () => {});
    };

    describe('validate inputs', () => {
      const goodBody = {
        id: 'greeting risk',
        projectId: exampleProject1.id,
        project: exampleProject1,
        detail: "what's up",
        isResolved: false,
        dateCreated: '2015-10-06',
        createdByUserId: exampleMemberUser.userId,
        createdBy: exampleMemberUser
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

      it('fails when user id is a decimal', async () => {
        const res = await func({ body: { ...goodBody, userId: 4.3 } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when invalid projectId', async () => {
        const res = await func({ body: { ...goodBody, projectId: -2 } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when projectId is a decimal', async () => {
        const res = await func({ body: { ...goodBody, projectId: -2 } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('returns failure when project does not exist', async () => {
        const res = await func({ ...goodBody, projectId: 100000 });
        expect(res.statusCode).toBe(400); // 404
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
