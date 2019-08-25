import Component from './Component';
import { connect } from 'react-redux';

import { generateAction, LOGOUT } from '../../redux/actions';

const mapStateToProps = state => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(generateAction(LOGOUT)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
