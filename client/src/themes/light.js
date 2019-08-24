import { red, grey, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom light theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: grey['400'],
    },
    secondary: {
      main: blueGrey['400'],
    },
    error: {
      main: red.A700,
    },
    background: {
      paper: grey['100'],
      default: grey['100'],
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export default theme;
