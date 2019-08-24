import { connect } from 'react-redux';

import { generateAction, DELETE_TASK } from '../../redux/actions';
import Component from './Component';

const mapStateToProps = state => ({
  tasks: state.task.tasks.filter(task => task.type === 'trash'),
  loadingTasks: state.task.isLoading,
});

const mapDispatchToProps = dispatch => ({
  deleteTask: id => dispatch(generateAction(DELETE_TASK, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
