import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import { useForm } from './util/FormUtils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2, 1),
  },
}));

const initialState = {
  subtasks: {},
};

let ID = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        subtasks: { ...state.subtasks, [ID++]: {} },
      };
    case 'REMOVE':
      return {
        ...state,
        subtasks: Object.keys(state.subtasks).reduce(
          (subtasks, id) => (id !== action.id ? { ...subtasks, [id]: state.subtasks[id] } : subtasks),
          {}
        ),
      };
    case 'UPDATE':
      return {
        ...state,
        subtasks: { ...state.subtasks, [action.id]: action.subtask },
      };
    default:
      return state;
  }
};

const ProjectTaskView = ({ taskId }) => {
  const classes = useStyles();
  const task = useSelector(state => state.task.tasks.find(({ _id }) => _id === taskId));

  const [state, dispatch] = useReducer(reducer, initialState);

  const add = () => dispatch({ type: 'ADD' });
  const save = () => {
    // TODO: implement save functionality
  };

  return (
    !!task && (
      <Container>
        <div className={classes.container}>
          {task.name}
          <div>
            {Object.keys(state.subtasks).map(id => (
              <Subtask key={id} id={id} dispatch={dispatch} />
            ))}
          </div>
          <div>
            <Button onClick={add}>Add</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      </Container>
    )
  );
};

const subtaskFields = [
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

const Subtask = ({ id, dispatch }) => {
  const { t } = useTranslation();
  const form = useForm(subtaskFields);

  useEffect(() => {
    dispatch({ type: 'UPDATE', id, subtask: form.values });
  }, [dispatch, id, form.values]);

  return (
    <form noValidate>
      <TextField label={t('task.name')} {...form.getFieldProps('name')} />
    </form>
  );
};

export default ProjectTaskView;
