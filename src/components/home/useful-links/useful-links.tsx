/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './useful-links.module.css';
import { linkPipe } from '../../../shared/pipes';

const UsefulLinks: React.FC = () => {
  return (
    <div>
      <h2>Useful links</h2>
      <h3>Finance</h3>
      <ul>
        <li>
          {linkPipe(
            'Personal purchasing guidelines',
            'https://docs.google.com/document/d/1M5Ldy9L1BifBo18tdKpv3CH-frRneyEK26hUXbtMg7Q/edit'
          )}
        </li>
        <li>{linkPipe('Procurement Form', 'https://forms.gle/6ztRoa1iL7p1KHwP6')}</li>
      </ul>
      <h3>Other</h3>
      <ul>
        <li>
          {linkPipe(
            'Part numbering spreadsheet',
            'https://docs.google.com/spreadsheets/d/1av0ReONZF3r82kCvkUEGl3uue4jfQgbw-KQDZnsejPQ/edit'
          )}
        </li>
      </ul>
    </div>
  );
};

export default UsefulLinks;
