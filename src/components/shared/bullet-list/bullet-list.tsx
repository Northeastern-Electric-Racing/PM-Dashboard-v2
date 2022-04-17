/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import PageBlock from '../page-block/page-block';
import styles from './bullet-list.module.css';

interface BulletListProps {
  title: string;
  headerRight: JSX.Element;
  list: JSX.Element[];
  ordered?: boolean;
  readOnly?: boolean;
  fieldName?: string;
}

const BulletList: React.FC<BulletListProps> = ({ title, headerRight, list, ordered }) => {
  const listPrepared = list.map((bullet, idx) => <li key={idx}>{bullet}</li>);
  let builtList = <ul className={styles.bulletList}>{listPrepared}</ul>;
  if (ordered) {
    builtList = <ol className={styles.bulletList}>{listPrepared}</ol>;
  }
  return <PageBlock title={title} headerRight={headerRight} body={builtList} />;
};

export default BulletList;
