/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import './app-context.module.css';

export const UserContext = createContext<string>('');
export const UserLogInContext = createContext<(user: string) => void>((u) => '');
export const UserLogOutContext = createContext<() => void>(() => '');

const AppContext: React.FC = (props) => {
  const [user, setUser] = useState<string>('');

  const logUserIn = (userName: string) => {
    setUser(userName);
    localStorage.setItem('userId', userName);
  };
  const logUserOut = () => {
    setUser('');
    localStorage.removeItem('userId');
  };

  const queryClient = new QueryClient();

  return (
    <UserContext.Provider value={user}>
      <UserLogInContext.Provider value={logUserIn}>
        <UserLogOutContext.Provider value={logUserOut}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>{props.children}</BrowserRouter>
          </QueryClientProvider>
        </UserLogOutContext.Provider>
      </UserLogInContext.Provider>
    </UserContext.Provider>
  );
};

export default AppContext;
