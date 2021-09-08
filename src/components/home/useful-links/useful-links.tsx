/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './useful-links.module.css';

const UsefulLinks: React.FC = () => {
  return (
    <div>
      <h2>Useful links</h2>
      <h3>Finance</h3>
      <ul>
        <li>
          <a className={styles.link} href="https://twitter.com/" target="_blank" rel="noreferrer">
            Personal purchasing guidelines
          </a>
        </li>
        <li>
          <a className={styles.link} href="https://twitter.com/" target="_blank" rel="noreferrer">
            Procurement form
          </a>
        </li>
      </ul>
      <h3>Other</h3>
      <ul>
        <li>
          <a className={styles.link} href="https://twitter.com/" target="_blank" rel="noreferrer">
            Part numbering spreadsheet
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UsefulLinks;
