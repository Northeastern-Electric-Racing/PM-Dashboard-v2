/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

//import styles from './work-packages-table.module.css';
import { WorkPackage, 
  exampleWorkPackage1, 
  exampleWorkPackage2, 
  exampleWorkPackage3} from 'utils';
import WorkPackageSummary from '../../components/work-package-summary/work-package-summary';

const WorkPackagesTable: React.FC = () => {

  const workPackages: Array<WorkPackage> = [
    exampleWorkPackage1,
    exampleWorkPackage2,
    exampleWorkPackage3
  ];

  return (
    <div>
      {workPackages.map((wp: WorkPackage, idx: number) => (
        <div key={idx}>
          <hr />
          <WorkPackageSummary workPackage={wp} />
        </div>
      ))}
    </div>
  );
};

export default WorkPackagesTable;
