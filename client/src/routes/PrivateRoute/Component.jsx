import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../../components/Header';

const PrivateRoute = ({ hasToken, component: Component, ...other }) => (
  <Route
    {...other}
    component={props =>
      !hasToken ? (
        <Redirect to="/auth" />
      ) : (
        <div className="app">
          <Header />
          <Component {...props} />
        </div>
      )
    }
  />
);

const mapStateToProps = state => ({
  hasToken: !!state.auth.token,
});

export default connect(mapStateToProps)(PrivateRoute);
