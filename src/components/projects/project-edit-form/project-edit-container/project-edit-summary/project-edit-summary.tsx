/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Collapse, Form } from 'react-bootstrap';
import { Project } from 'utils';
import { weeksPipe, wbsPipe, endDatePipe, listPipe } from '../../../../../shared/pipes';
import { routes } from '../../../../../shared/routes';
import styles from './work-package-summary.module.css';
import { Col, Container, Row } from 'react-bootstrap';
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
          <b>Project Summary</b>
          <Form.Control as="textarea" value={summary} rows={4} />
        </Form.Group>
      }
    />
  );
};

export default ProjectEditSummary;
