import Component from './Component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import { trashTasksSelector } from '../../../redux/selectors';

const mapStateToProps = state => ({
  count: 0,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);
