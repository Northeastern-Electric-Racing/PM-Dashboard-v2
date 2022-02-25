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

interface ProjectSummaryProps {
  project: Project;
}

const WorkPackageSummary: React.FC<ProjectSummaryProps> = ({ project }) => {
  const [open, setOpen] = useState(false);

  const {summary} = project;

  return (
    <Form.Group>
      <b>Project Summary</b>
      <textarea>{summary}</textarea>
    </Form.Group>
  );
};

export default WorkPackageSummary;
