/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './work-packages-table.module.css';
import { WorkPackage, 
  exampleWorkPackage1, 
  exampleWorkPackage2, 
  exampleWorkPackage3} from 'utils';
import { Accordion, Card } from "react-bootstrap";
import WorkPackageSummary from '../../components/work-package-summary/work-package-summary';

const WorkPackagesTable: React.FC = () => {

  const workPackages: Array<WorkPackage> = [
    exampleWorkPackage1,
    exampleWorkPackage2,
    exampleWorkPackage3
  ];

  return (
    <Accordion className={styles.tempContainer}>
      {workPackages.map((wp: WorkPackage, idx: number) => (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={wp.name} className={styles.packageHeader}>
            <div>
              <h4 className={styles.wbsNum}>{wp.wbsNum.area}.{wp.wbsNum.project}.{wp.wbsNum.workPackage}</h4>
              <h4 className={styles.projectInfo}>{wp.name}</h4>
              <h4 className={styles.deadline}>1 week</h4>
            </div>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey={wp.name}>
              <Card.Body>
                <WorkPackageSummary workPackage={wp} />
              </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default WorkPackagesTable;
