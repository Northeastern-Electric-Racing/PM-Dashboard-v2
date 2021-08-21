/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button } from 'react-bootstrap';
import PageBlock from '../../../shared/page-block/page-block';
import PageTitle from '../../../shared/page-title/page-title';
import CommonFormFields from './common-form-fields/common-form-fields';
import styles from './new-change-request-page.module.css';

const NewChangeRequestPage: React.FC = () => {
  const submitHandler = () => {
    alert('submitted');
  };

  return (
    <>
      <PageTitle title={'New Change Request'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <>
            <CommonFormFields />
            <p>placeholder for specific form fields</p>
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
