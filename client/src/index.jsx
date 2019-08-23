import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';

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
  </ThemeProvider>,
  document.querySelector('#app')
);
