/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render } from '@testing-library/react';
import PageBlock from './page-block';

describe('card component', () => {
  it('renders without error', () => {
    render(<PageBlock />);
  });
});
