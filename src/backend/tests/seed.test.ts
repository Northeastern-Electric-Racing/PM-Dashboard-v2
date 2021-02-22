/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { seedUser } from '../functions/seed';

test('Seed user has proper values', () => {
  expect(seedUser.name).toBe('Jane');
});
