<!-- import React, { useState } from 'react';
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
      open={responseStatus[0]}
      autoHideDuration={6000}
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
 -->

### SnackBar Example

This component will help to display the messages

```js
import SnackBar from './SnackBar';
import Button from '@material-ui/core/Button';

const [responseStatus, setResponseStatus] = React.useState([]);

const handleClose = () => {
  setResponseStatus([false]);
};

const snackbarMessage = (state, message) => {
  if (state === 'open') {
    setResponseStatus([true, 'error', 'Display error message']);
  } else if (state === 'post_success') {
    setResponseStatus([true, 'success', message]);
  } else if (state === 'post_error') {
    setResponseStatus([true, 'error', message]);
  } else {
    console.log('error in post returns');
  }
};

<>
  <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
  <Button
    variant='contained'
    color='primary'
    onClick={() => snackbarMessage('open')}
    size='small'
  >
    Click
  </Button>
</>;
```
