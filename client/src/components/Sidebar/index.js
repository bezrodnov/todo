import Component from './Component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  taskCount: state.task.tasks.length,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);
