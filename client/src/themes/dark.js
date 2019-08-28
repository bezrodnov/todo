import { red, grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom dark theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: grey['500'],
    },
    secondary: {
      main: grey['800'],
    },
    error: {
      main: red['900'],
    },
    background: {
      paper: grey['700'],
      default: grey['700'],
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.5)',
      secondary: 'rgba(255, 255, 255, 0.5)',
      disabled: 'rgba(255, 255, 255, 0.38)',
      hint: 'rgba(255, 255, 255, 0.38)',
    },
  },
});

export default theme;
