import { connect } from 'react-redux';

import Component from './Component';

import { incomingTasksSelector } from '../../redux/selectors';

const mapStateToProps = state => ({
  tasks: incomingTasksSelector(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
