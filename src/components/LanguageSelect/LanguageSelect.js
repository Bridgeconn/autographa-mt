import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { API } from '../../store/api';
import { Box } from '@material-ui/core';

export default function LanguageSelect(props) {
  const [languages, setLanguages] = useState(null);
  useEffect(() => {
    API.get('languages?limit=10').then(function (response) {
      setLanguages(response.data);
    });
  }, []);
  return (
    <Box style={{ width: props.width || 300 }}>
      <Select
        onChange={(option) => props.onChange(option || '')}
        options={languages}
        getOptionValue={(option) => option.code}
        getOptionLabel={(option) => option.language}
        placeholder={languages ? 'Select Language' : 'Loading'}
        isSearchable
        isClearable
        value={props.value}
        isLoading={!languages}
        isDisabled={!languages}
      />
    </Box>
  );
}

LanguageSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  width: PropTypes.number,
};
