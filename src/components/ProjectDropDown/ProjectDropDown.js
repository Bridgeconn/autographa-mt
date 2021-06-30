import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { API } from '../../store/api';
import { Box } from '@material-ui/core';

export default function ProjectDropDown(props) {
  const { width, value, onChange, componentName } = props;
  const [sourceLanguages, setSourceLanguages] = useState(null);
  useEffect(() => {
    API.get('autographa/projects?active=true&skip=0&limit=100').then(function (
      response
    ) {
      setSourceLanguages(response.data);
    });
  }, []);
  return (
    <Box style={{ width: width || 300 }}>
      {/* {console.log(sourceLanguages)} */}
      <Select
        onChange={(option) => onChange(option)}
        // projectId={(option) => projectId(option.projectId)}
        options={sourceLanguages}
        getOptionValue={(option) => option.projectId}
        getOptionLabel={(option) =>
          option.sourceLanguage.language +
          ' - ' +
          'to' +
          ' - ' +
          option.targetLanguage.language
        }
        placeholder={sourceLanguages ? componentName : 'Loading'}
        isSearchable
        // isClearable
        value={value}
        isLoading={!sourceLanguages}
        isDisabled={!sourceLanguages}
      />
    </Box>
  );
}

ProjectDropDown.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  width: PropTypes.number,
  componentName: PropTypes.string,
  projectId: PropTypes.number,
};
