import { connect } from 'react-redux';

import { generateAction, MARK_TASK_AS_TRASH } from '../../redux/actions';

import Component from './Component';

const mapStateToProps = ({ task: { isSaving } }) => ({ isSaving });

const mapDispatchToProps = dispatch => ({
  markAsTrash: (task, onSuccess) => dispatch(generateAction(MARK_TASK_AS_TRASH, { id: task._id, onSuccess })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
