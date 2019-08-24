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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
}));

const SettingsDialog = ({ open, onClose, t, i18n }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    language: 'en',
  });

  const handleChange = name => ({ target: { value } }) => {
    setValues(oldValues => ({
      ...oldValues,
      [name]: value,
    }));
    i18n.changeLanguage(value); // TODO: remove this test line and update language in a better way
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
      aria-labelledby="settings-dialog-title"
      aria-describedby="settings-dialog-description"
    >
      <DialogTitle id="settings-dialog-title">{t('settingsDialog.title')}</DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel autoFocus htmlFor="language">
              {t('settings.language')}
            </InputLabel>
            <Select value={values.language} onChange={handleChange('language')} inputProps={{ id: 'language' }}>
              <MenuItem value="en">{t('global.language.en')}</MenuItem>
              <MenuItem value="ru">{t('global.language.ru')}</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('global.cancel')}
        </Button>
        <Button onClick={onClose} color="primary">
          {t('global.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDialog;
