import Component from './Component';
import { connect } from 'react-redux';

import { generateAction, UPDATE_USER } from '../../redux/actions';

const mapStateToProps = state => ({
  user: state.user.user,
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(generateAction(UPDATE_USER, user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);