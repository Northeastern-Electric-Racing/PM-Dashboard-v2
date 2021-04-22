/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement, createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AppAuthenticated from '../app-authenticated/app-authenticated';
import AppPublic from '../app-public/app-public';
import './app-main.module.css';
import WorkPackageDetails from '../../components/work-package-details/work-package-details';
import { exampleWorkPackage1 } from 'utils';
import WorkPackageSummary from '../../components/work-package-summary/work-package-summary';

export const UserContext = createContext<string>('');
export const UserLogInContext = createContext<(user: string) => void>((u) => '');
export const UserLogOutContext = createContext<() => void>(() => '');

const AppMain: React.FC = () => {
  const [user, setUser] = useState<string>('');

  const logUserIn: (userName: string) => void = (userName) => {
    console.log(`${userName} logged in!`);
    setUser(userName);
  };

  const logUserOut: () => void = () => {
    console.log(`${user} logged out!`);
    setUser('');
  };

  let app: ReactElement = <AppPublic />;

  if (user !== '') {
    app = <AppAuthenticated />;
  }

  if (user === 'rachel') {
    app = (
      <>
        <h1>hahahaha</h1>
        <Button className="primary" onClick={(e) => alert("Sorry, you're not eligible.")}>
          become cool
        </Button>
      </>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <UserLogInContext.Provider value={logUserIn}>
        <UserLogOutContext.Provider value={logUserOut}>
          <BrowserRouter>
            <WorkPackageDetails workPackage={exampleWorkPackage1} />
          </BrowserRouter>
        </UserLogOutContext.Provider>
      </UserLogInContext.Provider>
    </UserContext.Provider>
  );
};

export default AppMain;
