import React from 'react';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default ({ task, icon, title, description, onClick }) => {
  return (
    <Tooltip title={title}>
      <Button variant="outlined" onClick={onClick}>
        {icon}
      </Button>
    </Tooltip>
  );
};
