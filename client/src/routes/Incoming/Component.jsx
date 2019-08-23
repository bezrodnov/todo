import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';

const Incoming = ({ tasks }) => {
  return <Container>Incoming tasks</Container>;
};

Incoming.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      notes: PropTypes.string,
      estimatedDate: PropTypes.instanceOf(Date),
    })
  ),
};

export default Incoming;
