import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = ({ user: { isLoading } }) => ({ isLoading });

export default connect(mapStateToProps)(Component);
