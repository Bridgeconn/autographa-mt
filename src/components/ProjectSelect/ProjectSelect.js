import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { API } from '../../store/api';
import { Box } from '@material-ui/core';

export default function ProjectSelect(props) {
  const { value, onChange } = props;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    API.get('autographa/projects?active=true').then(function (response) {
      setProjects(response.data);
    });
  }, []);
  return (
    <Box style={{ width: 300 }}>
      <ReactSelect
        onChange={(option) => onChange(option)}
        options={projects}
        getOptionValue={(option) => option}
        getOptionLabel={(option) => option.projectName}
        placeholder={'Select Project'}
        isSearchable
        isClearable
        value={value}
        isLoading={!projects}
        isDisabled={!projects}
      />
    </Box>
  );
}
ProjectSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
};
