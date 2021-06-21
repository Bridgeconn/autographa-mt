import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function SnackBar(props) {
  const responseStatus = props.responseStatus;

  return (
    <Snackbar
      style={{ height: "100%" }}
      open={responseStatus[0]}
      autoHideDuration={2000}
      onClose={props.handleClose}
    >
      <Alert
        onClose={responseStatus[0]}
        severity={responseStatus[1]}
        onClose={props.handleClose}
      >
        {responseStatus[2]}
      </Alert>
    </Snackbar>
  );
}

SnackBar.propTypes = {
  handleClose: PropTypes.func,
};
