import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { API } from '../../store/api';
import { Box } from '@material-ui/core';

const LanguageSelect = (props) => {
  const [languages, setLanguages] = useState(null);
  useEffect(() => {
    API.get('languages?limit=10000').then(function (response) {
      setLanguages(response.data);
    });
  }, []);
  return (
    <Box style={{ width: props.width || 300 }}>
      <Select
        onChange={(option) => props.onChange(option.code)}
        options={languages}
        getOptionValue={(option) => option.code}
        getOptionLabel={(option) => option.language}
        placeholder='Select Language'
        isSearchable
      />
    </Box>
  );
};

LanguageSelect.propTypes = {
  onChange: PropTypes.func,
  width: PropTypes.number
};

export default LanguageSelect;
