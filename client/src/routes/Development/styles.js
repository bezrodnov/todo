import { makeStyles } from '@material-ui/core/styles';

const taskFieldStyles = {
  fontSize: 12,
  lineHeight: '20px',
  overflow: 'hidden',
  padding: 0,
};

export const useStyles = makeStyles(theme => ({
  container: {
    transition: theme.transitions.create('opacity', { duration: 500 }),
    '&.task-enter': { opacity: 0 },
    '&.task-enter-active': { opacity: 1 },
    '&.task-exit': { opacity: 1, pointerEvents: 'none' },
    '&.task-exit-active': { opacity: 0, pointerEvents: 'none' },
  },
  task: {
    margin: theme.spacing(1, 0),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.secondary.main}`,
    overflow: 'hidden',
    background: theme.palette.secondary.light,

    '&$expanded': {
      '& $expandIcon': {
        transform: 'rotate(90deg)',
      },
    },
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    transition: theme.transitions.create(['background']),
    background: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),

    '&:hover': {
      background: theme.palette.secondary.light,
      color: theme.palette.getContrastText(theme.palette.secondary.light),
      '& $taskTitle input': {
        color: theme.palette.getContrastText(theme.palette.secondary.light),
      },
    },

    '& $taskPriority': {
      margin: theme.spacing(1),
    },
  },
  taskTitle: {
    flex: 1,
    '& input': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      height: '100%',
      lineHeight: `${theme.spacing(4)}px`,
      cursor: 'pointer',
      color: theme.palette.getContrastText(theme.palette.secondary.main),
    },
  },
  taskPriority: {
    cursor: 'pointer',
    minWidth: theme.spacing(6),
    width: theme.spacing(6),
    height: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: '1px solid #CCCCCC',
  },
  expandIcon: {
    transition: theme.transitions.create(['transform', 'color']),
    cursor: 'pointer',
    fontSize: '2rem',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
    '& svg': {
      height: theme.spacing(4),
      fontSize: theme.spacing(3),
    },
  },
  removeIcon: {
    cursor: 'pointer',
    height: theme.spacing(4),
    transition: theme.transitions.create('color'),
    '&:hover': {
      color: theme.palette.text.secondary,
    },
    '& svg': {
      height: theme.spacing(4),
      fontSize: theme.spacing(3),
    },
  },
  unsetPriority: {
    background: 'linear-gradient(45deg, #aaaaaa 0%, #ffffff 50%, #aaaaaa 100%)',
  },
  lowPriority: {
    background: 'linear-gradient(45deg, #fbf3bd 0%, #f9e551 27%, #f9f8ef 50%, #f3d705 77%, #f9ed95 100%)',
    borderColor: '#f9e551',
  },
  mediumPriority: {
    background: 'linear-gradient(45deg, #fbcebd 0%, #f98151 27%, #f9f3ef 50%, #f34805 77%, #f9b195 100%)',
    borderColor: '#f98151',
  },
  highPriority: {
    background: 'linear-gradient(45deg, #ff0000 0%, #ffffff 50%, #ff0000 100%)',
    borderColor: '#cc0000',
  },
  invisible: {
    visibility: 'hidden',
  },
  subtasks: {
    marginLeft: theme.spacing(2),
    opacity: 1,
  },
  taskDetails: {
    borderTop: `2px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '1fr 100px',
    gridColumnGap: theme.spacing(1),
  },
  field: {
    display: 'flex',
    '& .MuiInputBase-root': {
      flex: 1,
      padding: 0,
    },
    '& input': {
      ...taskFieldStyles,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    '& textarea': {
      ...taskFieldStyles,
    },
    '& label': {
      display: 'inline-block',
      fontSize: 12,
      lineHeight: '20px',
      paddingRight: theme.spacing(1),
      '&::after': {
        content: '":"',
      },
    },
  },
  expanded: {},
}));
