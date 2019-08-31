import { connect } from 'react-redux';

import { generateAction, MARK_TASK_AS_TRASH } from '../../redux/actions';

import Component from './Component';

const mapStateToProps = ({ task: { isLoading, isSaving } }) => ({
  isLoading: isLoading || isSaving,
});

const mapDispatchToProps = dispatch => ({
  markAsTrash: (task, onSuccess) => dispatch(generateAction(MARK_TASK_AS_TRASH, task, onSuccess)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
