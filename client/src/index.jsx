import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Auth from './routes/Auth';
import Finished from './routes/Finished';
import Incoming from './routes/Incoming';
import Project from './routes/Project';
import Reference from './routes/Reference';
import Someday from './routes/Someday';
import Trash from './routes/Trash';

import Development from './routes/Development';

import ThemeProvider from './components/ThemeProvider';
import Notifications from './components/Notifications';
import LoadingMask from './components/LoadingMask';
import MainFrame from './components/MainFrame';

import store from './redux/store';

import './i18n';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <Suspense fallback={<LoadingMask />}>
          <Notifications />
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/finished" component={Finished} wrapper={MainFrame} />
              <PrivateRoute exact path="/incoming" component={Incoming} wrapper={MainFrame} />
              <PrivateRoute exact path="/reference" component={Reference} wrapper={MainFrame} />
              <PrivateRoute exact path="/someday" component={Someday} wrapper={MainFrame} />
              <PrivateRoute exact path="/trash" component={Trash} wrapper={MainFrame} />
              <PrivateRoute exact path="/home" component={Incoming} wrapper={MainFrame} />
              <PrivateRoute exact path="/project/:taskId" component={Project} wrapper={MainFrame} />
              <PublicRoute exact path="/auth" component={Auth} />
              <PublicRoute exact path="/dev" component={Development} />
              <Redirect to="/home" />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById('app')
);
