import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import ReactSelect from 'react-select';
import LanguageSelect from '../LanguageSelect';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';

export default function AddSource() {
  const [language, setLanguage] = useState(null);
  const [versions, setVersions] = useState('');
  const [version, setVersion] = useState('');
  const [revision, setRevision] = useState('');
  const [responseStatus, setResponseStatus] = React.useState([]);

  useEffect(() => {
    API.get('versions').then(function (response) {
      setVersions(response.data);
    });
  }, []);
  const handleClose = () => {
    setResponseStatus([false]);
  };
  const handleRevision = (e) => {
    setRevision(e.target.value);
  };
  const clearForm = () => {
    setRevision('');
  };
  const addSource = (e) => {
    e.preventDefault();

    if (!language) {
      setResponseStatus([true, 'error', 'Please select a language']);
      return;
    }
    if (!version) {
      setResponseStatus([true, 'error', 'Please select a version']);
      return;
    }

    const data = {
      contentType: 'bible',
      language: language.code,
      version: version.versionAbbreviation,
      revision: revision,
      year: 2020,
      license: 'CC-BY-SA',
    };

    API.post('sources', data)
      .then(function (response) {
        setResponseStatus([true, 'success', response.data.message]);
        clearForm();
      })
      .catch((error) => {
        setResponseStatus([true, 'error', error.response.data.error]);
      });
  };
  return (
    <Box>
      <form noValidate autoComplete='off' onSubmit={addSource}>
        <Box display='flex'>
          <LanguageSelect onChange={setLanguage} width={300} value={language} />
          <Box style={{ width: 250 }}>
            <ReactSelect
              onChange={(option) => setVersion(option)}
              options={versions}
              getOptionValue={(option) => option.versionId}
              getOptionLabel={(option) => option.versionName}
              placeholder={'Select Version'}
              isSearchable
              isClearable
              value={version}
              isLoading={!versions}
              isDisabled={!versions}
            />
          </Box>
          <TextField
            id='revision'
            size='small'
            style={{ width: 100 }}
            label='Revision'
            variant='outlined'
            value={revision}
            onChange={handleRevision}
          />
        </Box>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          style={{ margin: '10px' }}
        >
          Add Source
        </Button>
      </form>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    </Box>
  );
}
