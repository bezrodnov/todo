import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteContext = React.createContext(null);

export default ({ component: Component, wrapper: Wrapper, ...other }) => {
  const hasToken = useSelector(state => !!state.auth.token);

  const render = ({ match = {}, ...other }) =>
    hasToken ? (
      <RouteContext.Provider value={other}>
        <Wrapper>
          <Component {...(match.params || {})} />
        </Wrapper>
      </RouteContext.Provider>
    ) : (
      <Redirect to="/auth" />
    );

  return <Route {...other} render={render} />;
};

export const useRouter = () => React.useContext(RouteContext);
