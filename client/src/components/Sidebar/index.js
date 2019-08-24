import Component from './Component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  incomingTaskCount: filterTasksByType(state, 'incoming').length,
  trashTaskCount: filterTasksByType(state, 'trash').length,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);

const filterTasksByType = (state, type) => state.task.tasks.filter(task => task.type === type);
