import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
}));

const DialogBody = ({ onClose, loading, createTask }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [values, setValues] = React.useState({
    name: '',
    description: '',
    notes: '',
    estimatedDate: null,
  });

  const handleChange = name => ({ target: { value } }) => {
    setValues(oldValues => ({
      ...oldValues,
      [name]: value,
    }));
  };

  const handleDateChange = name => date => {
    setValues(oldValues => ({
      ...oldValues,
      [name]: date,
    }));
  };

  const saveChanges = () => {
    createTask(values);
    // TODO: verify results and close
    //onClose();
  };

  // TODO: add loading mask
  return (
    <>
      <DialogTitle id="create-task-dialog-title">{t('createTaskDialog.title')}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            required
            label={t('task.name')}
            className={classes.formControl}
            placeholder={t('task.name')}
            value={values.name}
            onChange={handleChange('name')}
          />
          <TextField
            label={t('task.description')}
            className={classes.formControl}
            placeholder={t('task.description')}
            value={values.description}
            onChange={handleChange('description')}
          />
          <KeyboardDatePicker
            autoOk
            margin="normal"
            label={t('task.estimatedDate')}
            className={classes.formControl}
            format="MM/dd/yyyy"
            value={values.estimatedDate}
            onChange={handleDateChange('estimatedDate')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            label={t('task.notes')}
            className={classes.formControl}
            placeholder={t('task.notes')}
            value={values.notes}
            onChange={handleChange('notes')}
          />
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

const CreateTaskDialog = ({ open, onClose, loading, createTask }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-task-dialog-title"
      aria-describedby="create-task-dialog-description"
    >
      <DialogBody createTask={createTask} onClose={onClose} loading={loading} />
    </Dialog>
  );
};

CreateTaskDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createTask: PropTypes.func.isRequired,
};

export default CreateTaskDialog;
