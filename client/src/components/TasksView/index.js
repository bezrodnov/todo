import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = ({ task: { isLoading } }) => ({ isLoading });

export default connect(mapStateToProps)(Component);
