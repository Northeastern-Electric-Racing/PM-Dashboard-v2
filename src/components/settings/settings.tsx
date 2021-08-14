/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { UserContext } from '../app/app-context-query/app-context-query';
import './settings.module.css';

const Settings: React.FC = () => {
  const user = useContext(UserContext);
  return (
    <>
      <h3>This is the Settings Page</h3>
      <p>User: {user}</p>
    </>
  );
};

export default Settings;
