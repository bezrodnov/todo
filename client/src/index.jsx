import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Notifications from './components/Notifications';

import Auth from './routes/Auth';
import Trash from './routes/Trash';
import Incoming from './routes/Incoming';

import ThemeProvider from './components/ThemeProvider';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import store from './redux/store';

import './i18n';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <Suspense fallback="...loading">
          <Notifications />
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/trash" component={Trash} />
              <PrivateRoute exact path="/incoming" component={Incoming} />
              <PrivateRoute exact path="/home" component={Incoming} />
              <PublicRoute exact path="/auth" component={Auth} />
              <Redirect to="/home" />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.querySelector('#app')
);
