import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import LanguageSelect from '../LanguageSelect/LanguageSelect.js';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridLeft: {
    paddingLeft: '80px',
    alignItems: 'center',
    fontSize: '16px',
  },
  gridRight: {
    alignItems: 'center',
    marginBottom: '10px',
  },
  dataLearn: {
    paddingLeft: '80px',
    alignItems: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  checkbox: {
    marginTop: '20px',
  },
  button: {
    paddingLeft: '20px',
    marginTop: '20px',
    marginBottom: '20px',
  },
});

export default function CreateProject(props) {
  const classes = useStyles(props);
  const [name, setName] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [useDataForLearning, setUseDataForLearning] = useState(false);
  const [responseStatus, setResponseStatus] = React.useState([]);

  const handleClose = () => {
    setResponseStatus([false]);
  };

  const snackbarMessage = (state, message) => {
    if (state === 'open') {
      setResponseStatus([
        true,
        'error',
        "Can't choose same Source Language and Target Language",
      ]);
    } else if (state === 'post_success') {
      setResponseStatus([true, 'success', message]);
    } else if (state === 'post_error') {
      setResponseStatus([true, 'error', message]);
    } else {
      console.log('error in post returns');
    }
  };

  const onSave = () => {
    if (targetLanguage.languageId === sourceLanguage.languageId) {
      snackbarMessage('open');
    } else {
      const data = {
        projectName: name,
        sourceLanguageCode: !sourceLanguage ? '' : sourceLanguage.code,
        targetLanguageCode: !targetLanguage ? '' : targetLanguage.code,
        useDataForLearning: useDataForLearning,
        active: true,
      };

      API.post('autographa/projects', data)
        .then(function (response) {
          snackbarMessage('post_success', response.data.message);
        })
        .catch((error) => {
          snackbarMessage('post_error', error.response.data.error);
        });
    }
  };

  const clearState = () => {
    setName('');
    setSourceLanguage('');
    setTargetLanguage('');
    setUseDataForLearning(false);
  };

  const canBeSubmitted = () => {
    return (
      name.length > 0 &&
      sourceLanguage instanceof Object &&
      targetLanguage instanceof Object
    );
  };

  const isEnabled = canBeSubmitted();

  return (
    <Grid container direction='row'>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />

      <Grid className={classes.gridLeft} item md={5} sm={12} container>
        <span>Name</span>
      </Grid>
      <Grid className={classes.gridRight} item md={7} sm={12} container>
        <form noValidate autoComplete='off'>
          <TextField
            id='outlined-size-small'
            variant='outlined'
            size='small'
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ style: { padding: '8px' } }}
          />
        </form>
      </Grid>

      <Grid className={classes.gridLeft} item md={5} sm={12} container>
        <span>Source Language</span>
      </Grid>
      <Grid className={classes.gridRight} item md={7} sm={12} container>
        <LanguageSelect
          onChange={setSourceLanguage}
          width={212}
          value={sourceLanguage}
        />
      </Grid>

      <Grid className={classes.gridLeft} item md={5} sm={12} container>
        <span>Target Language</span>
      </Grid>
      <Grid item md={7} sm={12} container>
        <LanguageSelect
          onChange={setTargetLanguage}
          width={212}
          value={targetLanguage}
        />
      </Grid>

      <Grid className={classes.dataLearn} item md={5} sm={6} container>
        <span>Use Data For Learning</span>
      </Grid>
      <Grid className={classes.checkbox} item md={7} sm={8} container>
        <Checkbox
          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
          onChange={(e) => setUseDataForLearning(e.target.checked)}
        />
      </Grid>

      <Grid item md={3} sm={4} container justify='flex-end' alignItems='center'>
        <Button
          size='small'
          disabled={!isEnabled}
          variant='contained'
          color='primary'
          onClick={onSave}
        >
          Save
        </Button>
      </Grid>
      <Grid
        className={classes.button}
        item
        md={3}
        sm={4}
        container
        justify='flex-start'
        alignItems='center'
      >
        <Button
          size='small'
          variant='contained'
          color='secondary'
          onClick={clearState}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}
