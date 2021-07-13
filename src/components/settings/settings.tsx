/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { UserContext } from '../app/app-context/app-context';
import './settings.module.css';

import PageTitle from '../shared/page-title/page-title';
import PageBlock from '../shared/page-block/page-block';

// †ødø; add the two new components, Page Title and Page Block, from shared

const Settings: React.FC = () => {
  const user = useContext(UserContext);
  const title = <PageTitle title="User settings" />
  // const body = PageBlock("User Settings", "", "User: {user}");
  // render(<PageBlock title={'test'} headerRight={<>hi</>} body={<>hello</>} />);
  const pageBlockBody = <>User: {user}</>;
  const body = <PageBlock title="User Settings" headerRight={<></>} body={pageBlockBody} />
  return (
    <>
      title
      body
    </>
  );
};

export default Settings;
