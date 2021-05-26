import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { API } from '../../store/api';
import { Box } from '@material-ui/core';

export default function SourceList(props) {
  const [sourceLanguages, setSourceLanguages] = useState(null);
  useEffect(() => {
    API.get('sources').then(function (response) {
      setSourceLanguages(response.data);
    });
  }, []);
  return (
    <Box style={{ width: props.width || 300 }}>
      <Select
        onChange={(option) => props.onChange(option || '')}
        options={sourceLanguages}
        getOptionValue={(option) => option.language.languageId}
        getOptionLabel={(option) => option.sourceName}
        placeholder={sourceLanguages ? 'Select Language' : 'Loading'}
        isSearchable
        isClearable
        value={props.value}
        isLoading={!sourceLanguages}
        isDisabled={!sourceLanguages}
      />
    </Box>
  );
}

SourceList.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  width: PropTypes.number,
};
