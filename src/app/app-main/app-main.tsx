/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement, createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppAuthenticated from '../app-authenticated/app-authenticated';
import AppPublic from '../app-public/app-public';
import './app-main.module.css';

export const UserContext = createContext<string>('');
export const UserLogInContext = createContext<(user: string) => void>((u) => '');
export const UserLogOutContext = createContext<() => void>(() => '');

const AppMain: React.FC = () => {
  const [user, setUser] = useState<string>('');

  const logUserIn = (userName: string) => setUser(userName);

  const logUserOut = () => setUser('');

  let app: ReactElement = <AppPublic />;

  if (user !== '') {
    app = <AppAuthenticated />;
  }

  return (
    <UserContext.Provider value={user}>
      <UserLogInContext.Provider value={logUserIn}>
        <UserLogOutContext.Provider value={logUserOut}>
          <BrowserRouter>{app}</BrowserRouter>
        </UserLogOutContext.Provider>
      </UserLogInContext.Provider>
    </UserContext.Provider>
  );
};

export default AppMain;
