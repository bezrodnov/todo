import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Priority from './Priority';

const PRIORITIES = ['high', 'medium', 'low', null];

const PriorityMenu = ({ anchorEl, onClose, onSelect }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {PRIORITIES.map(priority => (
        <MenuItem key={priority || 'unset'} onClick={() => onSelect(priority)}>
          <Priority priority={priority} />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default React.memo(PriorityMenu);
