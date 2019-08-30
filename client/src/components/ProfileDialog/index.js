import Component from './Component';
import { connect } from 'react-redux';

import { generateAction, UPDATE_USER } from '../../redux/actions';

const mapStateToProps = state => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  updateUser: (user, onSuccess) => dispatch(generateAction(UPDATE_USER, { ...user, onSuccess })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
