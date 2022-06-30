/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import {
  handler,
  createChangeJsonNonList,
  createDescriptionBulletChangesJson
} from '../functions/projects-edit';

describe('createChangeJsonNonList', () => {
  it('returns undefined if they are the same', async () => {
    const res = createChangeJsonNonList('test', 1, 1, 2, 3, 4);
    expect(res).toBe(undefined);
  });

  it('returns a good json if they are different', async () => {
    const res = createChangeJsonNonList('test', 'abc', 'def', 2, 3, 4);

    if (res === undefined) {
      throw new TypeError('should not be undefined');
    }

    expect(res.detail).toBe(`Edited test from "abc" to "def"`);
  });
  
  it('returns a good json if old value is null', async () => {
    const res = createChangeJsonNonList('project manager', null, 'James C-D', 2, 3, 4);

    if (res === undefined) {
      throw new TypeError('should not be undefined');
    }

    expect(res.detail).toBe(`Added project manager "James C-D"`);
  });
});

describe('createDescriptionBulletChangesJson', () => {
  it('works with no changes', async () => {
    const res = createDescriptionBulletChangesJson(
      [{ id: 1, detail: 'a', dateAdded: new Date() }],
      [{ id: 1, detail: 'a', dateAdded: new Date() }],
      2,
      3,
      4,
      'test'
    );
    expect(res.changes.length).toBe(0);
    expect(res.deletedIds.length).toBe(0);
  });

  it('works with changes', async () => {
    const res = createDescriptionBulletChangesJson(
      [
        { id: 1, detail: 'a', dateAdded: new Date() },
        { id: 2, detail: 'b', dateAdded: new Date() },
        { id: 3, detail: 'c', dateAdded: new Date() },
        { id: 5, detail: 'e', dateAdded: new Date() }
      ],
      [
        { id: 1, detail: 'a', dateAdded: new Date() },
        { id: 2, detail: 'bb', dateAdded: new Date() },
        { detail: 'd', dateAdded: new Date() }
      ],
      2,
      3,
      4,
      'test'
    );
    expect(res.changes.length).toBe(4);
    expect(res.deletedIds.length).toBe(2);
    expect(res.editedIdsAndDetails.length).toBe(1);
    expect(res.deletedIds).toEqual([3, 5]);
    expect(res.changes[1].detail).toBe(`Edited test from "b" to "bb"`);
    expect(res.changes[2].detail).toBe(`Removed test "c"`);
    expect(res.changes[3].detail).toBe(`Removed test "e"`);
    expect(res.changes[0].detail).toBe(`Added new test "d"`);
    expect(res.editedIdsAndDetails[0].id).toBe(2);
    expect(res.editedIdsAndDetails[0].detail).toBe('bb');
  });
});

describe('project edit', () => {
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
        wbsElementStatus: 'ACTIVE',
        budget: 1,
        summary: 'Not done',
        rules: ['rule 1', 'rule 2'],
        goals: [{ id: 1, detail: 'abc' }],
        features: [{ id: 1, detail: 'abc' }],
        otherConstraints: [
          { id: 1, detail: 'abc' },
          { id: 2, detail: 'abc' }
        ]
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

      it('fails when goals has no detail', async () => {
        const res = await func({ body: { ...goodBody, goals: [{ id: 1 }] } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when status is not in the enum', async () => {
        const res = await func({ body: { ...goodBody, wbsElementStatus: 'aaahhhhh' } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
