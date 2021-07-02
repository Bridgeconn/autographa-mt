import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { API } from '../../store/api';
import { Box } from '@material-ui/core';

export default function SourceList(props) {
  const { width, value, onChange } = props;
  const [sourceLanguages, setSourceLanguages] = useState(null);
  useEffect(() => {
    API.get('sources?content_type=bible').then(function (response) {
      setSourceLanguages(response.data);
    });
  }, []);
  return (
    <Box style={{ width: width || 300 }}>
      <Select
        onChange={(option) => onChange(option)}
        options={sourceLanguages}
        getOptionValue={(option) => option.language.languageId}
        getOptionLabel={(option) =>
          option.language.language +
          ' - ' +
          option.version.versionAbbreviation +
          ' - ' +
          option.version.revision
        }
        placeholder={sourceLanguages ? props.componentName : 'Loading'}
        isSearchable
        isClearable
        value={value}
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
  componentName: PropTypes.string,
};
