/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ThemeName } from 'utils';
import { useTheme } from '../../../../services/theme.hooks';
import { useSingleUserSettings, useUpdateUserSettings } from '../../../../services/users.hooks';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import PageBlock from '../../../layouts/page-block/page-block';
import ErrorPage from '../../ErrorPage/error-page';
import UserSettingsEdit from './user-settings-edit/user-settings-edit';
import UserSettingsView from './user-settings-view/user-settings-view';

interface UserSettingsProps {
  userId: number;
}

export interface FormInput {
  defaultTheme: ThemeName;
}

const UserSettings: React.FC<UserSettingsProps> = ({ userId }) => {
  const [edit, setEdit] = useState(false);
  const userSettings = useSingleUserSettings(userId);
  const update = useUpdateUserSettings();
  const theme = useTheme();

  if (userSettings.isLoading || update.isLoading) return <LoadingIndicator />;
  if (userSettings.isError)
    return <ErrorPage error={userSettings.error} message={userSettings.error.message} />;
  if (update.isError) return <ErrorPage error={update.error!} message={update.error?.message!} />;

  const handleConfirm = async ({ defaultTheme }: FormInput) => {
    setEdit(false);
    await update.mutateAsync({ id: userSettings.data?.id!, defaultTheme });
    const res = await userSettings.refetch();

    if (res.data?.defaultTheme && res.data?.defaultTheme !== theme.name) {
      theme.toggleTheme!(res.data?.defaultTheme);
    }
  };

  const editButton = <Button onClick={() => setEdit(true)}>Edit</Button>;
  const formButtons = (
    <div className="d-flex flex-row">
      <Button className="mr-1" variant="secondary" onClick={() => setEdit(false)}>
        Cancel
      </Button>
      <Button variant="success" type="submit" form="update-user-settings">
        Save
      </Button>
    </div>
  );

  return (
    <PageBlock title="User Settings" headerRight={!edit ? editButton : formButtons}>
      {!edit ? (
        <UserSettingsView settings={userSettings.data!} />
      ) : (
        <UserSettingsEdit currentSettings={userSettings.data!} onSubmit={handleConfirm} />
      )}
    </PageBlock>
  );
};

export default UserSettings;
