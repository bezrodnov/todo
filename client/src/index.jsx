import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Auth from './routes/Auth';
import App from './routes/App';
import Incoming from './routes/Incoming';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import theme from './theme';
import store from './redux/store';

import './i18n';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/incoming" component={Incoming} />
            <PrivateRoute exact path="/home" component={App} />
            <PublicRoute exact path="/auth" component={Auth} />
            <PrivateRoute component={App} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>,
  document.querySelector('#app')
);
