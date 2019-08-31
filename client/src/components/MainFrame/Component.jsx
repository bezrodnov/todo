import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Sidebar from '../Sidebar';
import LoadingMask from '../util/LoadingMask';

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
    transform: 'translate(0px, 0px)',
  },
}));

const MainFrame = ({ isLoading, children }) => {
  const classes = useStyles();

  return (
    <div className="app">
      <Header />
      <div className={classes.mainContainer}>
        <Sidebar />
        <div className={classes.pageContents}>{children}</div>
      </div>
      {isLoading && <LoadingMask />}
    </div>
  );
};

MainFrame.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default MainFrame;
