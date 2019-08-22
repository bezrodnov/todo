import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import { makeStyles } from '@material-ui/core/styles';

import ProfileDialog from './ProfileDialog';
import SettingsDialog from './SettingsDialog';

import { generateAction, LOGOUT } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  menuIcon: {
    paddingRight: theme.spacing(2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const MainMenu = ({ logout, anchorEl, open, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isProfileDialogOpen, setProfileDialogOpen] = React.useState(false);
  const [isSettingsDialogOpen, setSettingsDialogOpen] = React.useState(false);

  const openDialogHandler = stateMutator => () => {
    stateMutator(true);
    onClose();
  };

  const closeDialogHandler = stateMutator => () => {
    stateMutator(false);
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
        <MenuItem onClick={openDialogHandler(setProfileDialogOpen)}>
          <div className={classes.menuIcon}>
            <PersonIcon />
          </div>
          {t('navigation.menu.profile')}
        </MenuItem>
        <MenuItem onClick={openDialogHandler(setSettingsDialogOpen)}>
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
      <ProfileDialog open={isProfileDialogOpen} onClose={closeDialogHandler(setProfileDialogOpen)} />
      <SettingsDialog open={isSettingsDialogOpen} onClose={closeDialogHandler(setSettingsDialogOpen)} />
    </>
  );
};

MainMenu.propTypes = {
  anchorEl: PropTypes.object,
  logout: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(generateAction(LOGOUT)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);
