/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSingleProject, useAllProjects } from '../../../../services/projects.hooks';
import { useAllWorkPackages } from '../../../../services/work-packages.hooks';
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
import { Project, WorkPackage, WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';

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
  const [projectIdx, setProjectIdx] = useState(0);
  const [workPkgIdx, setWorkPkgIdx] = useState(0);

  const projectRes = useAllProjects();
  const workPkgsRes = useAllWorkPackages();

  if (projectRes.isLoading || workPkgsRes.isLoading) return <LoadingIndicator />;

  if (projectRes.isError || workPkgsRes.isError) {
    const error = (projectRes.isError) ? projectRes.error : workPkgsRes.error;
    return <ErrorPage message={error?.message} />;
  }

  return (
    <>
      <PageTitle title={'New Change Request'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <>
            <CommonFormFields setFormType={setFormType} projects={projectRes.data!} 
              workPkgs={workPkgsRes.data!} setProjectIdx={setProjectIdx} setWorkPkgIdx={setWorkPkgIdx}/>

            {formType === FormType.StageGate && 
              <StageGateFormFields project={projectRes.data![projectIdx]} workPkg={workPkgsRes.data![workPkgIdx]}/>}

            {formType !== FormType.StageGate && formType !== FormType.Initiation && 
              <StandardFormFields project={projectRes.data![projectIdx]} workPkg={workPkgsRes.data![workPkgIdx]}/>}
              
            {formType === FormType.Initiation && 
            <ActivationFormFields project={projectRes.data![projectIdx]} workPkg={workPkgsRes.data![workPkgIdx]}/>}
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
