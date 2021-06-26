import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';

export default function AddVersion() {
  const [abbreviation, setAbbreviation] = useState('');
  const [name, setName] = useState('');
  const [revision, setRevision] = useState('');
  const [responseStatus, setResponseStatus] = React.useState([]);

  const handleClose = () => {
    setResponseStatus([false]);
  };
  const handleAbbreviation = (e) => {
    setAbbreviation(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleRevision = (e) => {
    setRevision(e.target.value);
  };
  const clearForm = () => {
    setAbbreviation('');
    setName('');
    setRevision('');
  };
  const addVersion = (e) => {
    e.preventDefault();
    const data = {
      versionAbbreviation: abbreviation,
      versionName: name,
      revision: revision,
    };
    API.post('versions', data)
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
      <form noValidate autoComplete='off' onSubmit={addVersion}>
        <Box>
          <TextField
            id='versionAbbreviation'
            label='Version Abbreviation'
            variant='outlined'
            value={abbreviation}
            onChange={handleAbbreviation}
          />
          <TextField
            id='versionName'
            label='Version Name'
            variant='outlined'
            value={name}
            onChange={handleName}
          />
          <TextField
            id='versionRevision'
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
          Add Version
        </Button>
      </form>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    </Box>
  );
}
