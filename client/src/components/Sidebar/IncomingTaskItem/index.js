import Component from './Component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { incomingTasksSelector } from '../../../redux/selectors';

const mapStateToProps = state => ({
  taskCount: incomingTasksSelector(state).length,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);
