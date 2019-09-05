import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { generateAction, LOGIN, REGISTER } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarSignIn: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatarSignUp: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formContainer: {
    position: 'relative',
    '& input:-webkit-autofill': {
      '-webkit-transition-delay': '9999999s',
    },
  },
  signUnForm: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    clipPath: 'circle(25px at calc(100% - 50px) 50px)',
    background: theme.palette.secondary.main,
    transition: theme.transitions.create(['clip-path'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    '&$show': {
      clipPath: 'circle(calc(150%) at calc(100% - 50px) 50px)',
    },
  },
  show: {},
  switchIcon: {
    position: 'absolute',
    top: 25,
    right: 25,
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: theme.palette.secondary.main,
    transition: theme.transitions.create(['background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    '&$show': {
      background: theme.palette.background.paper,
    },

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 24,
      height: 3,
      background: theme.palette.background.paper,
      transform: 'translate(13px, 24px)',
      transition: theme.transitions.create(['background', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),
    },
    '&$show:before': {
      background: theme.palette.secondary.main,
      transform: 'translate(13px, 24px) rotate(-45deg)',
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 24,
      height: 3,
      background: theme.palette.background.paper,
      transform: 'translate(13px, 24px) rotate(90deg)',
      transition: theme.transitions.create(['background', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),
    },
    '&$show:after': {
      background: theme.palette.secondary.main,
      transform: 'translate(13px, 24px) rotate(45deg)',
    },
  },
}));

const Auth = () => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.formContainer}>
        <SignUpForm />
        <SignInForm />
      </Grid>
    </Grid>
  );
};

const SignInForm = () => {
  const classes = useStyles();
  const { t } = useTranslation('auth');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      dispatch(generateAction(LOGIN, { email, password }));
    },
    [dispatch, emailRef, passwordRef]
  );

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatarSignIn}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('SignIn')}
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={t('Email')}
          name="email"
          autoComplete="email"
          autoFocus
          inputRef={emailRef}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('Password')}
          type="password"
          autoComplete="current-password"
          inputRef={passwordRef}
        />
        <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
          {t('SignIn')}
        </Button>
      </form>
    </div>
  );
};

const SignUpForm = () => {
  const classes = useStyles();
  const { t } = useTranslation('auth');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const toggleForm = useCallback(() => setShow(!show), [show]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      dispatch(generateAction(REGISTER, { email, password }));
    },
    [dispatch, emailRef, passwordRef]
  );

  const containerClassName = clsx(classes.signUnForm, {
    [classes.show]: show,
  });

  const iconClassName = clsx(classes.switchIcon, {
    [classes.show]: show,
  });

  return (
    <div className={containerClassName}>
      <Tooltip title={t(show ? 'SignIn' : 'SignUp')} placement={show ? 'left' : 'bottom'} enterDelay={300}>
        <IconButton className={iconClassName} onClick={toggleForm} />
      </Tooltip>
      <div className={classes.paper}>
        <Avatar className={classes.avatarSignUp}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('SignUp')}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} id="signup">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('Email')}
            name="email"
            inputRef={emailRef}
            inputProps={{
              autoComplete: 'username email',
              form: {
                autoComplete: 'off',
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label={t('Password')}
            type="password"
            inputRef={passwordRef}
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {t('SignUp')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
