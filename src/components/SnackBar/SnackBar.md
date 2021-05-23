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
