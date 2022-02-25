/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Card } from 'react-bootstrap';
import { WorkPackage } from 'utils';
import { wbsPipe, weeksPipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './project-edit-wp-list.module.css';

interface ProjectEditWorkPackagesListProps {
  workPackages: WorkPackage[];
}

const ProjectEditWorkPackagesList: React.FC<ProjectEditWorkPackagesListProps> = ({
  workPackages
}) => {
  return (
    <PageBlock
      title={'Work Packages'}
      headerRight={<></>}
      body={
        <Card className={styles.header}>
          {workPackages.map((wp) => (
            <Card.Header>
              <div>
                <p className={styles.wbsNum}>{wbsPipe(wp.wbsNum)}</p>
                <p className={styles.name}>{wp.name} </p>
                <p className={styles.duration}>{weeksPipe(wp.duration)}</p>
              </div>
            </Card.Header>
          ))}
        </Card>
      }
    />
  );
};

export default ProjectEditWorkPackagesList;
