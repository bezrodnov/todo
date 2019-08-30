import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { add } from '../../../icons';

import CreateTaskDialog from '../../../components/CreateTaskDialog';
import AbstractSidebarItem from '../AbstractSidebarItem';

const CreateTaskItem = ({ ...other }) => {
  const { t } = useTranslation();

  const [isCreateTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);

  const openCreateTaskDialog = () => setCreateTaskDialogOpen(true);
  const closeCreateTaskDialog = () => setCreateTaskDialogOpen(false);

  return (
    <>
      <AbstractSidebarItem
        onClick={openCreateTaskDialog}
        icon={add}
        text={t('navigation.sidebar.createTask')}
        {...other}
      />
      <CreateTaskDialog open={isCreateTaskDialogOpen} onClose={closeCreateTaskDialog} />
    </>
  );
};

CreateTaskItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
};

export default CreateTaskItem;
