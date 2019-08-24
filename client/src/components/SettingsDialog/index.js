import Component from './Component';
import { connect } from 'react-redux';

import { generateAction, SET_THEME } from '../../redux/actions';

const mapStateToProps = ({ settings: { themeName: theme, themeNames } }) => ({ theme, themeNames });

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(generateAction(SET_THEME, theme)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
