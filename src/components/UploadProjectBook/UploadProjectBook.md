### Upload Book To Project

This component helps to upload bible books to a Project

```js
import { useState } from 'react';
import UploadProjectBook from './UploadProjectBook';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';
import ProjectSelect from '../ProjectSelect';

const [loading, setLoading] = React.useState('');
const [selectedFiles, setSelectedFiles] = React.useState('');
const [responseStatus, setResponseStatus] = React.useState([]);
const [project, setProject] = useState(null);

const handleClose = () => {
  setResponseStatus([false]);
};

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
  if (selectedFiles.length > 0) {
    setLoading(true);
    let files = selectedFiles;
    let readers = [];
    for (let i = 0; i < files.length; i++) {
      readers.push(readFileAsText(files[i]));
    }

    Promise.all(readers).then((values) => {
      const data = {
        projectId: project.projectId,
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
    });
  } else {
    setResponseStatus([true, 'error', 'Please select any files']);
  }

  clearState();
};
<>
  <Grid container direction='row'>
    <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    <ProjectSelect value={project} onChange={setProject} />
    <UploadProjectBook onChange={setSelectedFiles} />
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
