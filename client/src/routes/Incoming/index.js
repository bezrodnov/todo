import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = state => ({
  tasks: state.task.tasks,
  loadingTasks: state.task.isLoading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
