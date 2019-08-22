import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AccountCircle from '@material-ui/icons/AccountCircle';

const MobileMenu = ({ anchorEl, open, openMainMenu, onClose }) => {
  const { t } = useTranslation();
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="mobile-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={openMainMenu}>
        <IconButton aria-label="Account of current user" aria-controls="main-menu" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>{t('navigation.menu.profile')}</p>
      </MenuItem>
    </Menu>
  );
};

MobileMenu.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool,
  openMainMenu: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileMenu;
