import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = ({ auth: { token } }) => ({ hasToken: !!token });

export default connect(mapStateToProps)(Component);
