/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import BulletList from '../../../../shared/bullet-list/bullet-list';
import './description-list.module.css';

interface DescriptionListProps {
  workPackage: WorkPackage;
}

const DescriptionList: React.FC<DescriptionListProps> = ({ workPackage }) => {
  return (
    <BulletList
      title={'Description'}
      headerRight={<></>}
      list={workPackage.descriptionBullets.map((b) => (
        <>{b.detail}</>
      ))}
    />
  );
};

export default DescriptionList;
