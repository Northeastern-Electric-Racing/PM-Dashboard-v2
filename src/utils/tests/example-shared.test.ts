/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { example } from '../src/example-shared';

test('it works properly', () => {
  expect(example(5, 3)).toEqual(8);
});
