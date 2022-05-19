/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useHistory } from 'react-router-dom';
import { ChangeRequestType, WbsNumber } from 'utils';
import { useAuth } from '../../../../../services/auth.hooks';
import { useCreateActivationChangeRequest } from '../../../../../services/change-requests.hooks';
import { useAllUsers } from '../../../../../services/users.hooks';
import { routes } from '../../../../../shared/routes';
import ErrorPage from '../../../../shared/error-page/error-page';
import LoadingIndicator from '../../../../shared/loading-indicator/loading-indicator';
import StageGateWorkPackageModal from './stage-gate-work-package-modal/stage-gate-work-package-modal';

interface StageGateWorkPackageModalContainerProps {
  wbsNum: WbsNumber;
  modalShow: boolean;
  handleClose: () => void;
}

export interface FormInput {
  projectLeadId: number;
  projectManagerId: number;
  startDate: string;
  confirmDetails: boolean;
}

const StageGateWorkPackageModalContainer: React.FC<StageGateWorkPackageModalContainerProps> = ({
  wbsNum,
  modalShow,
  handleClose
}) => {
  const auth = useAuth();
  const users = useAllUsers();
  const history = useHistory();
  const { isLoading, isError, error, mutateAsync } = useCreateActivationChangeRequest();

  const handleConfirm = async ({
    projectLeadId,
    projectManagerId,
    startDate,
    confirmDetails
  }: FormInput) => {
    handleClose();
    if (auth.user?.userId === undefined)
      throw new Error('Cannot create activation change request without being logged in');
    await mutateAsync({
      submitterId: auth.user?.userId,
      wbsNum,
      type: ChangeRequestType.Activation,
      projectLeadId,
      projectManagerId,
      startDate,
      confirmDetails
    });
    history.push(routes.CHANGE_REQUESTS);
  };

  if (isLoading || users.isLoading) return <LoadingIndicator />;

  if (isError || users.isError) return <ErrorPage message={error?.message} />;

  return (
    <StageGateWorkPackageModal
      wbsNum={wbsNum}
      modalShow={modalShow}
      onHide={handleClose}
      onSubmit={handleConfirm}
      allUsers={users.data!}
    />
  );
};

export default StageGateWorkPackageModalContainer;
