import Component from './Component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import { trashTasksSelector } from '../../../redux/selectors';

// TODO: add projects selector and use it here
const mapStateToProps = state => ({
  projectCount: 0,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);
