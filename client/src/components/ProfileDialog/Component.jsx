import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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

const DialogBody = ({ user, updateUser, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [values, setValues] = React.useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    gender: user.gender || 'other',
    phone: user.phone || '',
  });

  const handleChange = name => ({ target: { value } }) => {
    setValues(oldValues => ({
      ...oldValues,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    updateUser(values);
    // TODO: verify results and close
    //onClose();
  };

  return (
    <>
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
              <MenuItem value="male">{t('global.gender.male')}</MenuItem>
              <MenuItem value="female">{t('global.gender.female')}</MenuItem>
              <MenuItem value="other">{t('global.gender.other')}</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('global.cancel')}
        </Button>
        <Button onClick={saveChanges} color="primary" autoFocus>
          {t('global.save')}
        </Button>
      </DialogActions>
    </>
  );
};

const ProfileDialog = ({ open, onClose, user, updateUser }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="profile-dialog-title"
      aria-describedby="profile-dialog-description"
    >
      <DialogBody user={user} updateUser={updateUser} onClose={onClose} />
    </Dialog>
  );
};

ProfileDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    birthDate: PropTypes.object,
    gender: PropTypes.oneOf(['male', 'female', 'other']),
  }),
  updateUser: PropTypes.func.isRequired,
};

export default ProfileDialog;
