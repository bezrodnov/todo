import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ hasToken, component: Component, ...other }) => (
  <Route {...other} component={props => (hasToken ? <Redirect to="/home" /> : <Component {...props} />)} />
);

const mapStateToProps = state => ({
  hasToken: !!state.auth.token,
});

export default connect(mapStateToProps)(PublicRoute);
