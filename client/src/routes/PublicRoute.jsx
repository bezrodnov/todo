import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...other }) => {
  const hasToken = useSelector(state => !!state.auth.token);
  return <Route {...other} render={props => (hasToken ? <Redirect to="/home" /> : <Component {...props} />)} />;
};
