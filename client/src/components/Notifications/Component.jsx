import React from 'react';
import { useTranslation } from 'react-i18next';

import MessageBox from './MessageBox';

const Notifications = ({ error, clearError }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <MessageBox variant="error" open={!!error} onClose={clearError} message={t(error)} />
    </React.Fragment>
  );
};

export default Notifications;
