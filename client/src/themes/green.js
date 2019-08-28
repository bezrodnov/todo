import { red, green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom green theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#09822d',
    },
    secondary: {
      main: '#118a7f',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: green[100],
      default: green[100],
    },
  },
});

export default theme;
