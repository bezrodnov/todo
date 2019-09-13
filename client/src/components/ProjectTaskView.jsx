import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import TaskTreeNode from './TaskTree/Node';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  taskTree: {
    margin: `${theme.spacing(4)}px auto 0`,
    flex: '1 1 auto',
    overflow: 'hidden auto',
  },
  buttonBar: {
    minHeight: theme.spacing(8.5),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
  },
}));

const ProjectTaskView = ({ taskId }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const task = useSelector(state => state.task.tasks.find(({ _id }) => _id === taskId));

  const save = () => {
    console.warn('save project feature is not implemented yet');
  };

  return (
    !!task && (
      <div className={classes.container}>
        <Container className={classes.taskTree}>
          <TaskTreeNode task={task} id={task._id} expanded={true} subtasks={[]} />
        </Container>
        <Container className={classes.buttonBar}>
          <Button onClick={save} variant="outlined" color="primary">
            {t('global.save')}
          </Button>
        </Container>
      </div>
    )
  );
};

export default ProjectTaskView;
