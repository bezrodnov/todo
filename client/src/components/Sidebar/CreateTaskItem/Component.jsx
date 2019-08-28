import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import AddIcon from '@material-ui/icons/AddCircle';

import CreateTaskDialog from '../../../components/CreateTaskDialog';
import AbstractItem from '../AbstractItem';

const CreateTaskItem = ({ expanded }) => {
  const { t } = useTranslation();

  const [isCreateTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);

  const openCreateTaskDialog = () => setCreateTaskDialogOpen(true);
  const closeCreateTaskDialog = () => setCreateTaskDialogOpen(false);

  return (
    <>
      <AbstractItem
        expanded={expanded}
        onClick={openCreateTaskDialog}
        icon={<AddIcon />}
        text={t('navigation.sidebar.createTask')}
      />
      <CreateTaskDialog open={isCreateTaskDialogOpen} onClose={closeCreateTaskDialog} />
    </>
  );
};

CreateTaskItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
};

export default CreateTaskItem;
