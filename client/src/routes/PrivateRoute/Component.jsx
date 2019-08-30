import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, wrapper: Wrapper, hasToken, isLoading, ...other }) => {
  const routeComponent = props =>
    hasToken ? (
      <Wrapper>
        <Component {...props} />
      </Wrapper>
    ) : (
      <Redirect to="/auth" />
    );

  return <Route {...other} component={routeComponent} />;
};

export default PrivateRoute;
