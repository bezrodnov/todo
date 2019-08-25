import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = state => ({
  hasToken: !!state.auth.token,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps)(Component);
