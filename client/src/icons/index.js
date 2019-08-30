import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

import AddCircle from '@material-ui/icons/AddCircle';
import Assignment from '@material-ui/icons/Assignment';
import Delete from '@material-ui/icons/Delete';
import Mail from '@material-ui/icons/Mail';
import Schedule from '@material-ui/icons/Schedule';

import { mdiCheckboxMarkedCircleOutline, mdiCalendarClock } from '@mdi/js';

export const add = <AddCircle />;

export const delay = <Schedule />;

export const incoming = <Mail />;

export const project = <Assignment />;

export const trash = <Delete />;

export const someday = (
  <SvgIcon>
    <path d={mdiCalendarClock} />
  </SvgIcon>
);

export const completed = (
  <SvgIcon>
    <path d={mdiCheckboxMarkedCircleOutline} />
  </SvgIcon>
);
