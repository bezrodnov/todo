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

const MainMenu = ({ anchorEl, open, onClose, logout }) => {
  const [isDialogOpen, setDialogOpen] = React.useState({ settings: false, profile: false });

  const classes = useStyles();
  const { t } = useTranslation();

  const toggleDialogHandler = (dialogType, open) => () => {
    setDialogOpen(values => ({ ...values, [dialogType]: open }));
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
        <MenuItem onClick={toggleDialogHandler('profile', true)}>
          <div className={classes.menuIcon}>
            <PersonIcon />
          </div>
          {t('navigation.menu.profile')}
        </MenuItem>
        <MenuItem onClick={toggleDialogHandler('settings', true)}>
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
      </Menu>
      <ProfileDialog open={isDialogOpen.profile} onClose={toggleDialogHandler('profile', false)} />
      <SettingsDialog open={isDialogOpen.settings} onClose={toggleDialogHandler('settings', false)} />
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
