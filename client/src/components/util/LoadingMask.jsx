import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/styles';

const animationDuration = '0.7s';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1200,
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    animationName: '$loadingMaskFade',
    animationDuration: '0.5s',
    opacity: 0.5,
    backgroundColor: theme.palette.primary.light,
  },
  spinner: {
    margin: 5,
    borderRadius: '50%',
    background: 'blue',
    animationName: '$loadingMaskSpinner',
    animationDuration,
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
  },
  '@keyframes loadingMaskFade': {
    from: { opacity: 0 },
    to: { opacity: 0.5 },
  },
  '@keyframes loadingMaskSpinner': {
    from: {
      opacity: 0,
      width: 5,
      height: 5,
    },
    to: {
      opacity: 1,
      width: 30,
      height: 30,
    },
  },
}));

const LoadingMask = ({ theme }) => {
  const classes = useStyles();

  const colors = [theme.palette.primary.dark, theme.palette.primary.main, theme.palette.primary.light];
  const Spinner = ({ i }) => (
    <div
      className={classes.spinner}
      style={{
        animationDelay: `calc(${animationDuration} * ${i} / 3)`,
        backgroundColor: colors[i],
      }}
    />
  );

  return (
    <div className={classes.root}>
      <div className={classes.mask} />
      <Spinner i={0} />
      <Spinner i={1} />
      <Spinner i={2} />
    </div>
  );
};

export default withTheme(LoadingMask);
