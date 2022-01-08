/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSingleProject } from '../../../../services/projects.hooks';
import { exampleAllProjects } from '../../../../test-support/test-data/projects.stub';
import PageBlock from '../../../shared/page-block/page-block';
import PageTitle from '../../../shared/page-title/page-title';
import CommonFormFields from './common-form-fields/common-form-fields';
import StandardFormFields from './standard-form-fields/standard-form-fields';
import ActivationFormFields from './activation-form-fields/activation-form-fields'
import StageGateFormFields from './stage-gate-form-fileds/stage-gate-form-fields'
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import styles from './new-change-request-page.module.css';

export enum FormType {
  NewFunction = 'New Function', 
  DesignIssue = 'Design Issue', 
  Other = 'Other', 
  Initiation = 'Initiation', 
  StageGate = 'Stage Gate'
}

const NewChangeRequestPage: React.FC = () => {
  const submitHandler = () => {
    alert('submitted');
  };

  // const { isLoading, isError, data, error } = useSingleProject();

  // if (isLoading) return <LoadingIndicator />;
  // if (isError) return <ErrorPage message={error?.message} />;

  const [formType, setFormType] = useState(FormType.NewFunction);
  const [projectVersion, setProjectVersion] = useState();


  return (
    <>
      <PageTitle title={'New Change Request'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <>
            <CommonFormFields setFormType={setFormType} />
            {formType === FormType.StageGate && <StageGateFormFields />}
            {formType !== FormType.StageGate && formType !== FormType.Initiation && <StandardFormFields />}
            {formType === FormType.Initiation && <ActivationFormFields />}
          </>
        }
      />
      <Button className={styles.submitButton} onClick={(e) => submitHandler()}>
        Submit
      </Button>
    </>
  );
};

export default NewChangeRequestPage;
