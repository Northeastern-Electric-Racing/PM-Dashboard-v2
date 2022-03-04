/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form } from 'react-bootstrap';
import { Project } from 'utils';

import PageBlock from '../../../../shared/page-block/page-block';

interface ProjectEditSummaryProps {
  project: Project;
}

const ProjectEditSummary: React.FC<ProjectEditSummaryProps> = ({ project }) => {
  const { summary } = project;

  return (
    <PageBlock
      title={'Project Summary'}
      headerRight={<></>}
      body={
        <Form.Group>
          <Form.Control as="textarea" value={summary} rows={4} />
        </Form.Group>
      }
    />
  );
};

export default ProjectEditSummary;
