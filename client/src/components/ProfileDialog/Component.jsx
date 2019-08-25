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

import { useForm } from '../util/FormUtils';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
}));

const formFields = [
  {
    name: 'firstName',
    type: 'text',
    required: true,
    defaultValue: '',
  },
  {
    name: 'lastName',
    type: 'text',
    required: true,
    defaultValue: '',
  },
  {
    name: 'gender',
    type: 'select',
    defaultValue: 'other',
  },
  {
    name: 'phone',
    type: 'phone',
    defaultValue: '',
  },
];

const DialogBody = ({ user, updateUser, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const form = useForm(formFields, { defaultValues: user });

  const saveChanges = () => {
    // TODO: add loading mask
    if (form.isValid()) {
      updateUser(form.values);
      // TODO: verify results and close
      //onClose();
    }
  };

  return (
    <>
      <DialogTitle id="profile-dialog-title">{t('profileDialog.title')}</DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="off">
          <TextField
            autoFocus
            required
            label={t('user.firstName')}
            className={classes.formControl}
            placeholder={t('user.firstName')}
            {...form.fieldProps('firstName')}
          />
          <TextField
            required
            label={t('user.lastName')}
            className={classes.formControl}
            placeholder={t('user.lastName')}
            {...form.fieldProps('lastName')}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="user-gender">{t('user.gender')}</InputLabel>
            <Select {...form.fieldProps('gender')} inputProps={{ id: 'user-gender' }}>
              <MenuItem value="male">{t('gender.male')}</MenuItem>
              <MenuItem value="female">{t('gender.female')}</MenuItem>
              <MenuItem value="other">{t('gender.other')}</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('global.cancel')}
        </Button>
        <Button onClick={saveChanges} color="primary">
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
