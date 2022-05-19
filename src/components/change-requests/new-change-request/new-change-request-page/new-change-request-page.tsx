/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Form } from 'react-bootstrap';
import { Project, WorkPackage, ChangeRequestType } from 'utils';
import PageBlock from '../../../shared/page-block/page-block';
import PageTitle from '../../../shared/page-title/page-title';
import CommonFormFields from './common-form-fields/common-form-fields';
import StandardFormFields from './standard-form-fields/standard-form-fields';
import styles from './new-change-request-page.module.css';

interface NewChangeRequestPageProp {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setType: React.Dispatch<React.SetStateAction<ChangeRequestType>>;
  formType: ChangeRequestType;
  projectData: Project[];
  workPkgsData: WorkPackage[];
  handleChange: (e: any) => void;
}

const NewChangeRequestPage: React.FC<NewChangeRequestPageProp> = ({
  submitHandler,
  setType,
  formType,
  projectData,
  workPkgsData,
  handleChange
}) => {
  return (
    <>
      <PageTitle title={'New Change Request'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <Form id="createChange" onSubmit={submitHandler}>
            <CommonFormFields
              setType={setType}
              projects={projectData}
              workPkgs={workPkgsData}
              handleChange={handleChange}
            />

            {formType !== ChangeRequestType.StageGate &&
              formType !== ChangeRequestType.Activation && (
                <StandardFormFields handleChange={handleChange} />
              )}

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
