import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import LoadingMask from '../../components/util/LoadingMask';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    position: 'fixed',
    top: theme.spacing(8),
    width: '100%',
    height: `calc(100% - ${theme.spacing(6)}px)`,
    zIndex: 1100,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'stretch',
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(7),
      height: `calc(100% - ${theme.spacing(7)}px)`,
    },
  },
  pageContents: {
    flex: 1,
  },
}));

const PrivateRoute = ({ component: Component, hasToken, isLoading, ...other }) => {
  const classes = useStyles();

  let routeComponent;
  if (hasToken) {
    routeComponent = props => (
      <div className="app">
        <Header />
        <div className={classes.mainContainer}>
          <Sidebar />
          <div className={classes.pageContents}>
            <Component {...props} />
          </div>
        </div>
        {isLoading && <LoadingMask />}
      </div>
    );
  } else {
    routeComponent = () => <Redirect to="/auth" />;
  }

  return <Route {...other} component={routeComponent} />;
};

export default PrivateRoute;
