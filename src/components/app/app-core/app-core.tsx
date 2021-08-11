/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useProvideAuth } from '../../../services/auth.hooks';
import { AuthContext } from '../app-context/app-context';
import AppPublic from '../app-public/app-public';
import './app-core.module.css';

const AppCore: React.FC = () => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      <AppPublic />
    </AuthContext.Provider>
  );
};

export default AppCore;
