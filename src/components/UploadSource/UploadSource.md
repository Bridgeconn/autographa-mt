This component helps to upload bible books

### Upload Source

```js
import UploadSource from './UploadSource';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';
const [loading, setLoading] = React.useState('');
import CircularProgress from '@material-ui/core/CircularProgress';

const [selectedFiles, setSelectedFiles] = React.useState('');
const [responseStatus, setResponseStatus] = React.useState([]);

const handleClose = () => {
  setResponseStatus([false]);
};

const projectId = 100000;
  

const clearState = () => {
  setSelectedFiles('');
};

const readFileAsText = (file) => {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsText(file);
  });
};

const loadText = () => {
  if(selectedFiles.length > 0){
  setLoading(true);
  let files = selectedFiles;
  let readers = [];
  for (let i = 0; i < files.length; i++) {
    readers.push(readFileAsText(files[i]));
  }

  Promise.all(readers).then((values) => {
    const data = {
      projectId: projectId,
      uploadedBooks: values,
    };
    API.put('autographa/projects', data)
      .then(function (response) {
        setResponseStatus([true, 'success', response.data.message]);
        setLoading(false);
      })
      .catch((error) => {
        setResponseStatus([true, 'error', 'failed']);
        setLoading(false);
      });
  });}else{
    setResponseStatus([true, 'error', 'Please select any files']);
  }

  clearState();
};
<>
  <Grid container direction='row'>
    <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    <UploadSource onChange={setSelectedFiles} />
    <Button
      color='primary'
      size='small'
      variant='contained'
      component='span'
      onClick={loadText}
    >
      Upload
    </Button>
    {loading && <CircularProgress size='1.5rem' />}
  </Grid>
</>;
```
