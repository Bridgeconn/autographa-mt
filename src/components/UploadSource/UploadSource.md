This component helps to upload bible books

### Upload Source

```js
import UploadSource from './UploadSource';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';

const [selectedFiles, setSelectedFiles] = React.useState('');
const [responseStatus, setResponseStatus] = React.useState([]);

const handleClose = () => {
  setResponseStatus([false]);
};

const [projectData, setProjectData] = React.useState({
  projectId: 100000,
  projectName: 'Mission Agape',
  sourceLanguage: {
    languageId: 100037,
    language: 'English',
    code: 'en',
    scriptDirection: 'left-to-right',
    metaData: {
      region: 'United Kingdom, Europe',
      'alternate-names': [
        'Anglit',
        'Kiingereza',
        'Gustavia English',
        'Samaná English',
        'Saint Lucian English',
        'Noongar',
        'Noonga',
        'Newcastle Northumber',
        'Neo-Nyungar (Noogar)',
        'Glaswegian',
        'Brummy',
        'Birmingham (Brummie)',
        'Bay Islands English',
        'Australian Standard English',
        'Aboriginal English',
        'African American Vernacular English (AAVE)',
      ],
      'suppress-script': 'Latn',
      'is-gateway-language': true,
    },
  },
  targetLanguage: {
    languageId: 100057,
    language: 'Hindi',
    code: 'hi',
    scriptDirection: 'left-to-right',
    metaData: {
      region: 'India, Asia',
      'alternate-names': [
        'Khadi Boli',
        'Khari Boli',
        'Dakhini',
        'Hindi-Urdu',
        'Khariboli',
      ],
      'suppress-script': 'Deva',
      'is-gateway-language': true,
    },
  },
  documentFormat: 'usfm',
  users: [
    {
      project_id: 100000,
      userId: 10101,
      userRole: 'owner',
      metaData: null,
      active: true,
    },
  ],
  metaData: {
    books: ['mat', 'luk', 'jhn', '3jn'],
    useDataForLearning: true,
  },
  active: true,
});

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
  let files = selectedFiles;
  let readers = [];
  for (let i = 0; i < files.length; i++) {
    readers.push(readFileAsText(files[i]));
  }

  Promise.all(readers).then((values) => {
    const data = {
      projectId: projectData.projectId,
      uploadedBooks: values,
    };
    API.put('autographa/projects', data)
      .then(function (response) {
        setResponseStatus([true, 'success', response.data.message]);
        console.log('ssssssss', response.data.message);
      })
      .catch((error) => {
        setResponseStatus([true, 'error', 'failed']);
        console.log('eeeeeeeeeeeeeee', error);
      });
  });

  clearState();
};
<>
  <Grid container direction='row'>
    <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    <UploadSource projectData={projectData} onChange={setSelectedFiles} />
    <Button
      color='primary'
      size='small'
      variant='contained'
      component='span'
      disabled={!selectedFiles}
      onClick={loadText}
    >
      Upload
    </Button>
  </Grid>
</>;
```
