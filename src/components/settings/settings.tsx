/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useAuth } from '../../services/auth.hooks';
import './settings.module.css';

const Settings: React.FC = () => {
  const auth = useAuth();
  return (
    <>
      <h3>This is the Settings Page</h3>
      <p>User: {auth.user?.emailId}</p>
    </>
  );
};

export default Settings;
