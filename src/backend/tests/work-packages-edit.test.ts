/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { mockContext } from '../../test-support/test-data/test-utils.stub';
import {
  handler,
  createListChangesJson,
  createChangeJsonNonList,
  createDescriptionBulletChangesJson
} from '../functions/work-packages-edit';

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
});

describe('createListChangesJson', () => {
  it('recognizes added and removed', async () => {
    const oldArray = [1, 2, 3];
    const newArray = [2, 3, 4];
    const res = createListChangesJson(oldArray, newArray, 1, 2, 3, 'test name');
    expect(res.length).toBe(2);
    expect(res[0].detail).toBe('Removed test name "1"');
    expect(res[1].detail).toBe('Added new test name "4"');
  });

  it('works with empty old array', async () => {
    const newArray = [2, 3, 4];
    const res = createListChangesJson([], newArray, 1, 2, 3, 'test name');
    expect(res.length).toBe(3);
    expect(res[0].detail).toBe('Added new test name "2"');
    expect(res[1].detail).toBe('Added new test name "3"');
  });

  it('works with empty new array', async () => {
    const oldArray = [2, 3, 4];
    const res = createListChangesJson(oldArray, [], 1, 2, 3, 'test name');
    expect(res.length).toBe(3);
    expect(res[0].detail).toBe('Removed test name "2"');
    expect(res[1].detail).toBe('Removed test name "3"');
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
        { id: 4, detail: 'd', dateAdded: new Date() }
      ],
      2,
      3,
      4,
      'test'
    );
    expect(res.changes.length).toBe(4);
    expect(res.deletedIds.length).toBe(2);
    expect(res.deletedIds).toEqual([3, 5]);
    expect(res.changes[0].detail).toBe(`Edited test from "b" to "bb"`);
    expect(res.changes[1].detail).toBe(`Removed test "c"`);
    expect(res.changes[2].detail).toBe(`Removed test "e"`);
    expect(res.changes[3].detail).toBe(`Added new test "d"`);
  });
});

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
        startDate: '2015-10-06',
        duration: 1,
        wbsElementIds: [1],
        expectedActivities: [{ id: 1, detail: 'abc' }],
        deliverables: [{ id: 2, detail: 'def' }]
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

      it('fails when expectedActivities has no id', async () => {
        const res = await func({ body: { ...goodBody, expectedActivities: { detail: 'ab' } } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });

      it('fails when expectedActivities has no detail', async () => {
        const res = await func({ body: { ...goodBody, expectedActivities: { id: 1 } } });
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Event object failed validation');
      });
    });
  });
});
