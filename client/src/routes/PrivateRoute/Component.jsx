import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from '../../components/Header';
import LoadingMask from '../../components/util/LoadingMask';

const PrivateRoute = ({ component: Component, hasToken, isLoading, ...other }) => (
  <Route
    {...other}
    component={props =>
      !hasToken ? (
        <Redirect to="/auth" />
      ) : (
        <div className="app">
          <Header />
          <Component {...props} />
          {isLoading && <LoadingMask />}
        </div>
      )
    }
  />
);

export default PrivateRoute;
