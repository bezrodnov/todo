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

import { useForm } from '../util/FormUtils';
import LoadingMask from '../util/LoadingMask';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
}));

const formFields = [
  {
    name: 'name',
    type: 'text',
    required: true,
    defaultValue: '',
  },
  {
    name: 'description',
    type: 'text',
    defaultValue: '',
  },
  {
    name: 'notes',
    type: 'multilinetext',
    defaultValue: '',
  },
  {
    name: 'estimatedDate',
    type: 'date',
    defaultValue: null,
  },
];

const DialogBody = ({ onClose, isCreating, createTask }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const form = useForm(formFields);

  const saveChanges = () => {
    if (form.isValid()) {
      createTask(form.values, onClose);
    }
  };

  return (
    <>
      <DialogTitle id="create-task-dialog-title">{t('createTaskDialog.title')}</DialogTitle>
      <DialogContent>
        <form noValidate>
          <TextField
            autoFocus
            required
            label={t('task.name')}
            className={classes.formControl}
            placeholder={t('task.name')}
            {...form.fieldProps('name')}
          />
          <TextField
            label={t('task.description')}
            className={classes.formControl}
            placeholder={t('task.description')}
            {...form.fieldProps('description')}
          />
          <KeyboardDatePicker
            autoOk
            margin="normal"
            label={t('task.estimatedDate')}
            className={classes.formControl}
            format="MM/dd/yyyy"
            {...form.fieldProps('estimatedDate')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            label={t('task.notes')}
            className={classes.formControl}
            placeholder={t('task.notes')}
            multiline
            {...form.fieldProps('notes')}
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
      {isCreating && <LoadingMask />}
    </>
  );
};

const CreateTaskDialog = ({ open, ...others }) => {
  return (
    <Dialog
      open={open}
      onClose={others.onClose}
      aria-labelledby="create-task-dialog-title"
      aria-describedby="create-task-dialog-description"
    >
      <DialogBody {...others} />
    </Dialog>
  );
};

CreateTaskDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  createTask: PropTypes.func.isRequired,
};

export default CreateTaskDialog;
