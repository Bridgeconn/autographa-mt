### Snack Bar Example

Demo for snackbar messages

```js
import SnackBar from './SnackBar';
import Button from '@material-ui/core/Button';

const [responseStatus, setResponseStatus] = React.useState([]);

const handleClose = () => {
  setResponseStatus([false]);
};
<>
  <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
  <Button
    variant='contained'
    color='primary'
    onClick={() => setResponseStatus([true, 'success', 'Success message'])}
    size='small'
    style={{ marginRight: 10 }}
  >
    Show Success Message
  </Button>
  <Button
    variant='contained'
    color='primary'
    onClick={() => setResponseStatus([true, 'error', 'Error message'])}
    size='small'
  >
    Show Error Message
  </Button>
</>;
```
