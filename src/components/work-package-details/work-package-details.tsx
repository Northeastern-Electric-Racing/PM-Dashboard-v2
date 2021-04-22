/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './work-package-details.module.css';
import { WorkPackage } from 'utils';
import {
  weeksPipe,
  dollarsPipe,
  linkPipe,
  wbsPipe,
  endDatePipe,
  listPipe
} from '../../shared/pipes';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
  className?: string;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({
  workPackage,
  className
}: WorkPackageDetailsProps) => {
  return <p>Hello</p>;
};

export default WorkPackageDetails;
