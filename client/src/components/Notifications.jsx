import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import MessageBox from './MessageBox';

import { generateAction, CLEAR_ERROR } from '../redux/actions';

const Notifications = ({ error, clearError }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <MessageBox variant="error" open={!!error} onClose={clearError} message={t(error)} />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  error: state.error.message,
});

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(generateAction(CLEAR_ERROR)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
