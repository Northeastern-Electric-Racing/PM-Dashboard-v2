/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, InputGroup } from "react-bootstrap";
import { WorkPackage } from "utils";
import { wbsPipe } from "../../../../../shared/pipes";

interface ProjectEditWorkPackagesListProps {
  workPackages: WorkPackage[];
}

const ProjectEditWorkPackagesList: React.FC<ProjectEditWorkPackagesListProps> = ({
  workPackages
}) => {
  const existingWorkPackages = workPackages.map(wp => (
        <InputGroup>
          <Form.Control as='text' aria-placeholder={wbsPipe(wp.wbsNum)} readOnly/>
          <Form.Control as='text' aria-placeholder={wp.name} readOnly />
        </InputGroup>
    )
  );

  return (

  );
};

export default ProjectEditWorkPackagesList;
