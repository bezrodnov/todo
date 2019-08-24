import React from 'react';
import { connect } from 'react-redux';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

const CustomThemeProvider = ({ theme, children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

const mapStateToProps = ({ settings: { theme } }) => ({ theme });

export default connect(mapStateToProps)(CustomThemeProvider);
