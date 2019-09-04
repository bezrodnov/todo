import { connect } from 'react-redux';

import {
  generateAction,
  MARK_TASK_AS_TRASH,
  MARK_TASK_AS_REFERENCE,
  MARK_TASK_AS_DELAYED,
  MARK_TASK_AS_FINISHED,
} from '../../redux/actions';

import Component from './Component';

const mapStateToProps = ({ task: { isSaving, isLoading } }) => ({
  isLoading: isLoading || isSaving,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    markAsTrash: (task, onSuccess) => dispatch(generateAction(MARK_TASK_AS_TRASH, { id: task._id, onSuccess })),
    markAsReference: (task, onSuccess) => dispatch(generateAction(MARK_TASK_AS_REFERENCE, { id: task._id, onSuccess })),
    markAsDelayed: (task, onSuccess) => dispatch(generateAction(MARK_TASK_AS_DELAYED, { id: task._id, onSuccess })),
    markAsFinished: (task, onSuccess) => dispatch(generateAction(MARK_TASK_AS_FINISHED, { id: task._id, onSuccess })),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
