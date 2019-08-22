import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
}));

const ProfileDialog = ({ open, onClose, t }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    gender: true,
    phone: null,
  });

  const handleChange = name => ({ target: { value } }) => {
    setValues(oldValues => ({
      ...oldValues,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="profile-dialog-title"
      aria-describedby="profile-dialog-description"
    >
      <DialogTitle id="profile-dialog-title">{t('profileDialog.title')}</DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="off">
          <TextField
            label={t('user.firstName')}
            className={classes.formControl}
            placeholder={t('user.firstName')}
            value={values.firstName}
            onChange={handleChange('firstName')}
          />
          <TextField
            label={t('user.lastName')}
            className={classes.formControl}
            placeholder={t('user.lastName')}
            value={values.lastName}
            onChange={handleChange('lastName')}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="user-gender">{t('user.gender')}</InputLabel>
            <Select value={values.gender} onChange={handleChange('gender')} inputProps={{ id: 'user-gender' }}>
              <MenuItem value={true}>{t('global.gender.male')}</MenuItem>
              <MenuItem value={false}>{t('global.gender.female')}</MenuItem>
              <MenuItem value={null}>{t('global.gender.other')}</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('global.cancel')}
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          {t('global.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProfileDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ProfileDialog;
