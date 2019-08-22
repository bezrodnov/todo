import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...other }) => (
  <Route
    {...other}
    component={props =>
      isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Suspense fallback="...loading">
          <Component {...props} />
        </Suspense>
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(PublicRoute);
