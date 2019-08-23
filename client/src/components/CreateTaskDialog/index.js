import { connect } from 'react-redux';

import Component from './Component';

import { generateAction, CREATE_TASK } from '../../redux/actions';

const mapStateToProps = state => ({
  loading: state.task.isCreatingTask,
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(generateAction(CREATE_TASK, { ...task, type: 'incoming' })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
