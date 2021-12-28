/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Fragment } from 'react';
import { DescriptionBullet } from 'utils';
import BulletList from '../bullet-list/bullet-list';
import './description-list.module.css';

interface DescriptionListProps {
  title: string;
  items: DescriptionBullet[];
  editMode?: boolean;
}

const DescriptionList: React.FC<DescriptionListProps> = ({ title, items, editMode }) => {
  return (
    <BulletList
      title={title}
      headerRight={<></>}
      list={items.map((b) => (
        <Fragment key={b.detail}>{b.detail}</Fragment>
      ))}
      editMode={editMode}
    />
  );
};

export default DescriptionList;
