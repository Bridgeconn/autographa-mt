import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';
import { Box, Modal } from '@material-ui/core';

export default function UploadSourceBook(props) {
  const { source } = props;
  const [loading, setLoading] = useState('');
  const [responseStatus, setResponseStatus] = useState([]);
  const fileInput = useRef();
  const handleClose = () => {
    setResponseStatus([false]);
  };

  const loadText = (e) => {
    if (e.target.files.length > 0) {
      setLoading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = [{ USFM: e.target.result }];
        console.log(data);
        API.post(`bibles/${source.sourceName}/books`, data)
          .then(function (response) {
            setResponseStatus([true, 'success', response.data.message]);
            setLoading(false);
          })
          .catch((e) => {
            setResponseStatus([true, 'error', e.response.data.details]);
            setLoading(false);
          });
      };
      reader.readAsText(file);
    } else {
      setResponseStatus([true, 'error', 'Please select any files']);
    }
  };

  return (
    <>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
      <input
        accept='.usfm,.sfm'
        type='file'
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={loadText}
        multiple
      />
      {source && (
        <Button
          color='primary'
          size='small'
          variant='contained'
          component='span'
          onClick={() => {
            fileInput.current.click();
          }}
        >
          Upload
        </Button>
      )}
      <Modal
        open={loading}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box
            fontSize='h5.fontSize'
            bgcolor='white'
            p={1}
            px={3}
            borderRadius='5px'
            color='grey'
            border={2}
            borderColor='text.primary'
          >
            Processing ...
          </Box>
        </div>
      </Modal>
    </>
  );
}

UploadSourceBook.propTypes = {
  source: PropTypes.object,
};
