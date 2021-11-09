/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { DescriptionBullet } from 'utils/src';
import BulletList from '../bullet-list/bullet-list';
import './description-list.module.css';

interface DescriptionListProps {
  title: string;
  items: DescriptionBullet[];
}

const DescriptionList: React.FC<DescriptionListProps> = ({ title, items }) => {
  return (
    <BulletList
      title={title}
      headerRight={<></>}
      list={items.map((b) => (
        <>{b.detail}</>
      ))}
    />
  );
};

export default DescriptionList;
