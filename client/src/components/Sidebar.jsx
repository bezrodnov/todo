import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const Sidebar = ({ open, requestHide, requestShow, history }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const showIncoming = () => {
    history.push('/incoming');
  };

  const sideList = () => (
    <div className={classes.list} role="presentation" onClick={requestHide} onKeyDown={requestHide}>
      <List>
        <ListItem button onClick={showIncoming}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={t('navigation.sidebar.inbox')} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <SwipeableDrawer open={open} onClose={requestHide} onOpen={requestShow}>
      {sideList()}
    </SwipeableDrawer>
  );
};

export default withRouter(Sidebar);
