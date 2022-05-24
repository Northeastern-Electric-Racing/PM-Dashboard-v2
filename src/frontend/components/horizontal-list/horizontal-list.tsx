/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import PageBlock from '../../layouts/page-block/page-block';
import styles from './horizontal-list.module.css';

interface HorizontalListProps {
  title: string;
  headerRight: JSX.Element;
  items: JSX.Element[];
}

// Page block component listing items horizontally with padding
const HorizontalList: React.FC<HorizontalListProps> = ({ title, headerRight, items }) => {
  return (
    <PageBlock
      title={title}
      headerRight={headerRight}
      body={
        <>
          {items.map((ele, idx) => (
            <div key={idx} className={styles.listItem}>
              {ele}
            </div>
          ))}
        </>
      }
    />
  );
};

export default HorizontalList;
