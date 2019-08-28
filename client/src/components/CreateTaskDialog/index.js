import { connect } from 'react-redux';

import Component from './Component';

import { generateAction, CREATE_TASK } from '../../redux/actions';

const mapStateToProps = state => ({
  isCreating: state.task.isCreating,
});

const mapDispatchToProps = dispatch => ({
  createTask: (task, onSuccess) => dispatch(generateAction(CREATE_TASK, { ...task, type: 'incoming', onSuccess })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
