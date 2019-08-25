import { connect } from 'react-redux';

import { generateAction, MARK_TASK_AS_TRASH } from '../../redux/actions';
import Component from './Component';

const mapStateToProps = state => ({
  tasks: state.task.tasks.filter(task => task.type === 'incoming'),
  isLoadingTasks: state.task.isLoading,
});

const mapDispatchToProps = dispatch => ({
  markTaskAsTrash: id => dispatch(generateAction(MARK_TASK_AS_TRASH, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
