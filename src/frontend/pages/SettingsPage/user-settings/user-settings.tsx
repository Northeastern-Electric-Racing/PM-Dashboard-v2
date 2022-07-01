/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSingleUserSettings } from '../../../../services/users.hooks';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import PageBlock from '../../../layouts/page-block/page-block';
import ErrorPage from '../../ErrorPage/error-page';
import UserSettingsView from './user-settings-view/user-settings-view';

interface UserSettingsProps {
  userId: number;
}

const UserSettings: React.FC<UserSettingsProps> = ({ userId }) => {
  const [edit, setEdit] = useState(false);
  const userSettings = useSingleUserSettings(userId);

  if (userSettings.isLoading) return <LoadingIndicator />;
  if (userSettings.isError) {
    return <ErrorPage error={userSettings.error} message={userSettings.error.message} />;
  }

  const editButton = <Button onClick={() => setEdit(true)}>Edit</Button>;
  const saveButton = (
    <Button
      onClick={() => {
        setEdit(false);
      }}
    >
      Save
    </Button>
  );
  const cancelButton = (
    <Button className="mr-1" variant="secondary" onClick={() => setEdit(false)}>
      Cancel
    </Button>
  );
  const buttonContainer = (
    <div className="d-flex flex-row">
      {!edit ? editButton : ''}
      {edit ? cancelButton : ''}
      {edit ? saveButton : ''}
    </div>
  );

  return (
    <PageBlock title="User Settings" headerRight={buttonContainer}>
      <Container fluid>
        <UserSettingsView settings={userSettings.data!} />
      </Container>
    </PageBlock>
  );
};

export default UserSettings;
