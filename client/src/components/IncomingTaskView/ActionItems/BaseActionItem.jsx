import React from 'react';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'flex-start',
  },
  info: {
    paddingLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  title: {},
  description: {
    fontSize: 10,
    lineHeight: 1,
    textTransform: 'none',
    fontWeight: 'normal',
  },
}));

export default ({ icon, title, description, onClick }) => {
  const classes = useStyles();
  return (
    <Button variant="outlined" className={classes.container} onClick={onClick} fullWidth>
      {icon}
      <span className={classes.info}>
        <span className={classes.title}>{title}</span>
        <span className={classes.description}>{description}</span>
      </span>
    </Button>
  );
};
