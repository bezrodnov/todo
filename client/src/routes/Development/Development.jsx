import React from 'react';
import uuid from 'uuid/v4';

import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import TaskTreeNode from '../../components/TaskTree/Node';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4, 1),
  },
}));

const taskTree = {
  id: uuid(),
  expanded: true,
  task: {
    name: 'Implement TODO project',
    description: 'TODO project should increase your performance',
  },
  subtasks: [
    {
      id: uuid(),
      task: {
        name: 'Keep session alive',
        priority: 'low',
        description:
          'Whenever user performs some action on the TODO pages - refresh user session so that user is not auto logged out',
      },
    },
    {
      id: uuid(),
      expanded: true,
      task: {
        name: 'Implement Create/Edit Project Component',
        priority: 'high',
      },
      subtasks: [
        {
          id: uuid(),
          task: {
            name: 'Create mock component',
            priority: 'high',
          },
        },
        {
          id: uuid(),
          task: {
            name: 'Periodically save edits inside this component',
            description:
              'Creating project can take some time and user can possibly leave the page before changes are saved.\n' +
              'It would be nice to save changes on this page from time to time so that user can return to it and resume editing',
            priority: 'medium',
          },
        },
      ],
    },
  ],
};

const Development = () => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.container}>
        <TaskTreeNode {...taskTree} />
      </div>
    </Container>
  );
};

export default Development;
