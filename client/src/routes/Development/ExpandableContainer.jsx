import React, { useState, useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  outer: {
    position: 'relative',
    overflow: 'hidden',
    transition: theme.transitions.create('height', {
      duration: 500,
    }),
  },
}));

export default ({ expanded, children, ...other }) => {
  const classes = useStyles();
  const [height, setHeight] = useState(expanded ? null : 0);
  const outerRef = useRef();

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const outerDiv = outerRef.current;
    const onTransitionEnd = () => {
      outerDiv.removeEventListener('transitionend', onTransitionEnd);
      setHeight(expanded ? null : 0);
    };

    outerDiv.style.height = (!expanded ? outerDiv.scrollHeight : 0) + 'px';
    outerDiv.addEventListener('transitionend', onTransitionEnd);
    requestAnimationFrame(() => {
      setHeight(expanded ? outerDiv.scrollHeight : 0);
    });
  }, [expanded]);

  return (
    <div className={classes.outer} ref={outerRef} style={{ height }}>
      {children}
    </div>
  );
};
