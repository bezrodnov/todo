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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
}));

const SettingsDialogContent = ({ onClose, theme, themeNames, setTheme }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    language: i18n.language,
    theme,
  });

  const changeLanguage = ({ target: { value } }) => {
    setValues(oldValues => ({
      ...oldValues,
      language: value,
    }));
    i18n.changeLanguage(value);
  };

  const changeTheme = ({ target: { value } }) => {
    setValues(oldValues => ({
      ...oldValues,
      theme: value,
    }));
    setTheme(value);
  };

  return (
    <>
      <DialogTitle id="settings-dialog-title">{t('settingsDialog.title')}</DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel autoFocus htmlFor="language">
              {t('settings.language')}
            </InputLabel>
            <Select value={values.language} onChange={changeLanguage} inputProps={{ id: 'language' }}>
              <MenuItem value="en">{t('language.en')}</MenuItem>
              <MenuItem value="ru">{t('language.ru')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel autoFocus htmlFor="theme">
              {t('settings.theme')}
            </InputLabel>
            <Select value={values.theme} onChange={changeTheme} inputProps={{ id: 'theme' }}>
              {themeNames.map(theme => (
                <MenuItem key={theme} value={theme}>
                  {t(`theme.${theme}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('global.ok')}
        </Button>
      </DialogActions>
    </>
  );
};

const SettingsDialog = ({ open, ...other }) => {
  return (
    <Dialog
      open={open}
      onClose={other.onClose}
      maxWidth="sm"
      fullWidth={true}
      aria-labelledby="settings-dialog-title"
      aria-describedby="settings-dialog-description"
    >
      <SettingsDialogContent {...other} />
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  themeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SettingsDialog;
