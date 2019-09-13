import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useStyles } from './styles';

const Details = ({ task, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const onChangeCallback = useCallback(
    e => {
      onChange({ [e.target.name]: e.target.value });
    },
    [onChange]
  );

  const onEstimatedDateChange = useCallback(estimatedDate => onChange({ estimatedDate }), [onChange]);

  return (
    <div className={classes.taskDetails}>
      <InputLabel>{t('task.description')}</InputLabel>
      <InputBase name="description" value={task.description} multiline onChange={onChangeCallback} />

      <InputLabel>{t('task.estimatedDate')}</InputLabel>
      <KeyboardDatePicker
        value={task.estimatedDate || null}
        autoOk
        format="MM/dd/yyyy"
        onChange={onEstimatedDateChange}
      />

      <InputLabel>{t('task.notes')}</InputLabel>
      <InputBase name="notes" value={task.notes} multiline onChange={onChangeCallback} />

      <InputLabel>{t('task.estimates')}</InputLabel>
      <Select name="estimates" value={task.estimates || ''} onChange={onChangeCallback}>
        <MenuItem value={null}></MenuItem>
        <MenuItem value={5}>{t('estimates.fiveMins')}</MenuItem>
        <MenuItem value={15}>{t('estimates.fifteenMins')}</MenuItem>
        <MenuItem value={30}>{t('estimates.thirtyMins')}</MenuItem>
        <MenuItem value={60}>{t('estimates.hour')}</MenuItem>
        <MenuItem value={120}>{t('estimates.twoHours')}</MenuItem>
        <MenuItem value={240}>{t('estimates.fourHours')}</MenuItem>
        <MenuItem value={480}>{t('estimates.day')}</MenuItem>
        <MenuItem value={560}>{t('estimates.twoDays')}</MenuItem>
        <MenuItem value={1000}>{t('estimates.more')}</MenuItem>
      </Select>
    </div>
  );
};

export default React.memo(Details);
