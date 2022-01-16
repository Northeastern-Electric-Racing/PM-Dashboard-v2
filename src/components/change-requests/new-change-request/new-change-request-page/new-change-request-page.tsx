/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
import { CR_Type } from '@prisma/client';


const NewChangeRequestPage: React.FC = () => {
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { type } = formData;
    if (type === CR_Type.ACTIVATION) {

    }
    alert('submitted');
  };

  const handleChange = (e: any) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const updateValue = (name: string, value: any) => {
    updateFormData({
      ...formData,
      [name]: value
    });
  }

  const [formData, updateFormData] = useState({
    projectWBS: 1,
    workPackageWBS: -1,
    type: "",

    what: "",
    scopeImpact: "",
    timelineImpact: "",
    budgetImpact: 0,
    why: [],

    projectLeadId: -1,
    projectManagerId: -1,
    startDate: "",
    confirmDetails: false,

    leftoverBudget: 0,
    confirmDone: false
  });

  console.log(formData);

  const [formType, setFormType] = useState<CR_Type>(CR_Type.DEFINITION_CHANGE);

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

  console.log(projectRes);

  return (
    <>
      <PageTitle title={'New Change Request'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <Form id="createChange" onSubmit={submitHandler}>
            <CommonFormFields setFormType={setFormType} 
              projects={projectRes.data!} 
              workPkgs={workPkgsRes.data!}
              handleChange={handleChange}
              updateValue={updateValue}/>

            {formType === CR_Type.STAGE_GATE && 
              <StageGateFormFields handleChange={handleChange} updateValue={updateValue}/>}

            {formType !== CR_Type.STAGE_GATE && formType !== CR_Type.ACTIVATION && 
              <StandardFormFields handleChange={handleChange} updateValue={updateValue}/>}
              
            {formType === CR_Type.ACTIVATION && 
            <ActivationFormFields handleChange={handleChange} updateValue={updateValue}/>}
            <Button className={styles.submitButton} type="submit">
              Submit
            </Button>
          </Form>
        }
      />
    </>
  );
};

export default NewChangeRequestPage;
