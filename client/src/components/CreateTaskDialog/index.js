import { connect } from 'react-redux';

import Component from './Component';

import { generateAction, CREATE_TASK } from '../../redux/actions';

const mapStateToProps = state => ({
  isLoading: state.task.isCreating || state.task.isLoading,
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(generateAction(CREATE_TASK, { ...task, type: 'incoming' })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
