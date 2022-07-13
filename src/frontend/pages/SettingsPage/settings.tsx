/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useAuth } from '../../../services/auth.hooks';
import PageTitle from '@@layouts/page-title/page-title';
import PageBlock from '../../layouts/page-block/page-block';

const Settings: React.FC = () => {
  const auth = useAuth();
  return (
    <>
      <PageTitle title="This is the Settings Page" />
      <PageBlock
        title="User Settings"
        headerRight={<></>}
        body={
          <>
            User: {auth.user?.emailId}
            <br />
            Role: {auth.user?.role}
          </>
        }
      />
    </>
  );
};

export default Settings;
