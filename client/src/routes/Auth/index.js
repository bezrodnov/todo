import { connect } from 'react-redux';

import { generateAction, LOGIN, REGISTER } from '../../redux/actions';

import Component from './Component';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(generateAction(LOGIN, payload)),
  register: payload => dispatch(generateAction(REGISTER, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
