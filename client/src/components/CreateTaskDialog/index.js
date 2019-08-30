import { connect } from 'react-redux';

import Component from './Component';

import { generateAction, SAVE_TASK } from '../../redux/actions';

const mapStateToProps = state => ({
  isSaving: state.task.isSaving,
});

const mapDispatchToProps = dispatch => ({
  saveTask: (task, onSuccess) => dispatch(generateAction(SAVE_TASK, { ...task, type: 'incoming', onSuccess })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
