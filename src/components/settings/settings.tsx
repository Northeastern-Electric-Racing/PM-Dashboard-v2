/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useSettings } from '../../services/settings.hooks';
import { useAuth } from '../../services/auth.hooks';
import PageTitle from '../shared/page-title/page-title';
import PageBlock from '../shared/page-block/page-block';
import './settings.module.css';
import { Button } from 'react-bootstrap';

const Settings: React.FC = () => {
  const auth = useAuth();
  const settings = useSettings();
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
            First Name: {auth.user?.firstName}
            <br />
            Last Name: {auth.user?.lastName}
            <br />
            Email: {auth.user?.emailId}
            <br />
            Dark Mode: {settings.darkMode ? 'Enabled' : 'Disabled'}
            <Button className={'mx-2'} size={'sm'} onClick={settings.toggleDarkMode}>
              Toggle Dark Mode
            </Button>
          </>
        }
      />
    </>
  );
};

export default Settings;
