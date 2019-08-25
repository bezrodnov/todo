import { connect } from 'react-redux';

import Component from './Component';

import { generateAction, CLEAR_ERROR } from '../../redux/actions';

const mapStateToProps = state => ({
  error: state.error.message,
});

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(generateAction(CLEAR_ERROR)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
