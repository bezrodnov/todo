import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default ({ component: Component, wrapper: Wrapper, ...other }) => {
  const hasToken = useSelector(state => !!state.auth.token);

  const render = props =>
    hasToken ? (
      <Wrapper>
        <Component {...props} />
      </Wrapper>
    ) : (
      <Redirect to="/auth" />
    );

  return <Route {...other} render={render} />;
};
