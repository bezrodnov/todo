import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

import AddCircle from '@material-ui/icons/AddCircleOutline';
import Delete from '@material-ui/icons/DeleteOutline';
import Mail from '@material-ui/icons/MailOutline';

import { mdiCheckboxMarkedCircleOutline } from '@mdi/js';

import { ReactComponent as Awaiting } from './svg/awaiting-project.svg';
import { ReactComponent as Delay } from './svg/delay.svg';
import { ReactComponent as Delegate } from './svg/delegate.svg';
import { ReactComponent as Project } from './svg/project.svg';
import { ReactComponent as Reference } from './svg/reference.svg';
import { ReactComponent as Repeating } from './svg/repeating.svg';
import { ReactComponent as Search } from './svg/search.svg';
import { ReactComponent as Someday } from './svg/someday.svg';

export const add = <AddCircle className="MuiSvgIcon-root" />;
export const awaiting = <Awaiting className="MuiSvgIcon-root" />;
export const delay = <Delay className="MuiSvgIcon-root" />;
export const delegate = <Delegate className="MuiSvgIcon-root" />;
export const incoming = <Mail className="MuiSvgIcon-root" />;
export const project = <Project className="MuiSvgIcon-root" />;
export const trash = <Delete className="MuiSvgIcon-root" />;
export const someday = <Someday className="MuiSvgIcon-root" />;
export const reference = <Reference className="MuiSvgIcon-root" />;
export const repeating = <Repeating className="MuiSvgIcon-root" />;
export const search = <Search className="MuiSvgIcon-root" />;

export const finished = (
  <SvgIcon>
    <path d={mdiCheckboxMarkedCircleOutline} />
  </SvgIcon>
);
