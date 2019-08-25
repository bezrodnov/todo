import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import { makeStyles } from '@material-ui/core/styles';

import ProfileDialog from '../ProfileDialog';
import SettingsDialog from '../SettingsDialog';

const useStyles = makeStyles(theme => ({
  menuIcon: {
    paddingRight: theme.spacing(2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const MenuItems = ({ openProfileDialog, openSettingsDialog, logout }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <MenuItem onClick={openProfileDialog}>
        <div className={classes.menuIcon}>
          <PersonIcon />
        </div>
        {t('navigation.menu.profile')}
      </MenuItem>
      <MenuItem onClick={openSettingsDialog}>
        <div className={classes.menuIcon}>
          <SettingsIcon />
        </div>
        {t('navigation.menu.settings')}
      </MenuItem>
      <MenuItem onClick={logout}>
        <div className={classes.menuIcon}>
          <ExitToAppIcon />
        </div>
        {t('navigation.menu.logout')}
      </MenuItem>
    </>
  );
};

const MainMenu = ({ anchorEl, open, onClose, ...other }) => {
  const [isDialogOpen, setDialogOpen] = React.useState({ settings: false, profile: false });

  const menuItemsProps = {
    ...other,
    openProfileDialog: () => {
      setDialogOpen(values => ({ ...values, profile: true }));
      onClose();
    },
    openSettingsDialog: () => {
      setDialogOpen(values => ({ ...values, settings: true }));
      onClose();
    },
  };

  const closeDialogHandler = dialogType => () => {
    setDialogOpen(values => ({ ...values, [dialogType]: false }));
    onClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="main-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={onClose}
      >
        <MenuItems {...menuItemsProps} />
      </Menu>
      <ProfileDialog open={isDialogOpen.profile} onClose={closeDialogHandler('profile')} />
      <SettingsDialog open={isDialogOpen.settings} onClose={closeDialogHandler('settings')} />
    </>
  );
};

MainMenu.propTypes = {
  anchorEl: PropTypes.object,
  logout: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default MainMenu;
