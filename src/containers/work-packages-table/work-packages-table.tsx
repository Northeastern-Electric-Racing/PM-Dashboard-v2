/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */


import styles from './work-packages-table.module.css';
import {
  exampleAllWorkPackages,
  WorkPackage
} from 'utils';
import WorkPackageSummary from '../../components/work-package-summary/work-package-summary';

const WorkPackagesTable: React.FC = () => {
  return (
    {exampleAllWorkPackages.map((wp: WorkPackage, idx: number) => (
      <div key={idx}>
        <br />
        <hr />
        <WorkPackageSummary workPackage={wp} />
      </div>
    ))}
  );
};

export default WorkPackagesTable;
