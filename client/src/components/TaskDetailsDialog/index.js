import { connect } from 'react-redux';

import Component from './Component';
import { generateAction, SAVE_TASK } from '../../redux/actions';

const Wrapper = ({ tasks, taskId, ...other }) => Component({ task: tasks.find(({ _id }) => _id === taskId), ...other });

const mapStateToProps = ({ task: { tasks, isSaving } }) => ({ tasks, isSaving });

const mapDispatchToProps = dispatch => ({
  saveTask: (task, onSuccess) => dispatch(generateAction(SAVE_TASK, { ...task, onSuccess })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);
