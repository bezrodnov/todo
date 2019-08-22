import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Sidebar from './Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navigation = ({ t, i18n }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const hide = () => setOpen(false);
  const show = () => setOpen(true);

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={show}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} requestHide={hide} requestShow={show} />
    </div>
  );
};

export default Navigation;
