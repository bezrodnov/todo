import React from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';

import { useForm } from '../util/FormUtils';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0.5, 1),
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

const EditTask = ({ task, ...other }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const form = useForm(formFields, { defaultValues: task });

  return (
    <div {...other}>
      <form noValidate>
        <TextField
          required
          label={t('task.name')}
          className={classes.formControl}
          multiline
          {...form.getFieldProps('name')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={t('task.description')}
          className={classes.formControl}
          {...form.getFieldProps('description')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={t('task.notes')}
          className={classes.formControl}
          multiline
          {...form.getFieldProps('notes')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <KeyboardDatePicker
          autoOk
          margin="normal"
          label={t('task.estimatedDate')}
          className={classes.formControl}
          format="MM/dd/yyyy"
          {...form.getFieldProps('estimatedDate')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </div>
  );
};

export default EditTask;
