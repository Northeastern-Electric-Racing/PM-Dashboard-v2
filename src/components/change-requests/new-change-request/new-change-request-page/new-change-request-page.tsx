/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAllProjects } from '../../../../services/projects.hooks';
import { useAllWorkPackages } from '../../../../services/work-packages.hooks';
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

  const [formType, setFormType] = useState(FormType.NewFunction);

  const projectRes = useAllProjects();
  const workPkgsRes = useAllWorkPackages();

  if (projectRes.isLoading || workPkgsRes.isLoading) return <LoadingIndicator />;

  if (projectRes.isError || workPkgsRes.isError) {

    if (projectRes.isError !== workPkgsRes.isError) {
      const message = (projectRes.isError) ? projectRes.error?.message : workPkgsRes.error?.message;
      return <ErrorPage message={message} />;
      
    }

    if (projectRes.isError && workPkgsRes.isError) {
      let message = projectRes.error?.message;
      
      if (message && workPkgsRes.error) {
        message += "; " + workPkgsRes.error!.message;
      }
      else if (!message) {
        message = workPkgsRes.error?.message!;
      }
      
      return <ErrorPage message={message} />;
    }
  }

  return (
    <>
      <PageTitle title={'New Change Request'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <>
            <CommonFormFields setFormType={setFormType} 
              projects={projectRes.data!} 
              workPkgs={workPkgsRes.data!}/>

            {formType === FormType.StageGate && 
              <StageGateFormFields/>}

            {formType !== FormType.StageGate && formType !== FormType.Initiation && 
              <StandardFormFields/>}
              
            {formType === FormType.Initiation && 
            <ActivationFormFields/>}
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
