import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const Sidebar = ({ open, requestHide, requestShow, history, incomingTaskCount, trashTaskCount }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const goToIncoming = () => history.push('/incoming');
  const goToTrash = () => history.push('/trash');

  const sideList = () => (
    <div className={classes.list} role="presentation" onClick={requestHide} onKeyDown={requestHide}>
      <List>
        <ListItem button onClick={goToIncoming}>
          <ListItemIcon>
            <Badge badgeContent={incomingTaskCount} color="primary">
              <MailIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={t('navigation.sidebar.inbox')} />
        </ListItem>
        <ListItem button onClick={goToTrash}>
          <ListItemIcon>
            <Badge badgeContent={trashTaskCount} color="primary">
              <DeleteIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={t('navigation.sidebar.trash')} />
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

Sidebar.propTypes = {
  open: PropTypes.bool,
  requestShow: PropTypes.func.isRequired,
  requestHide: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  incomingTaskCount: PropTypes.number,
  trashTaskCount: PropTypes.number,
};

export default Sidebar;
