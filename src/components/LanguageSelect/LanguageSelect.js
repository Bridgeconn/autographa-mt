import React from 'react';
import PropTypes from 'prop-types';
import { AsyncPaginate } from 'react-select-async-paginate';
import { API } from '../../store/api';
import { Box } from '@material-ui/core';

export default function LanguageSelect(props) {
  const { value, width, onChange } = props;
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const response = await API.get(
      `languages?search_word=${searchQuery}&skip=${(page - 1) * 20}&limit=20`
    );
    const responseJSON = response.data;
    return {
      options: responseJSON,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: searchQuery ? 2 : page + 1,
      },
    };
  };

  return (
    <Box style={{ width: width || 300 }}>
      <AsyncPaginate
        onChange={(option) => onChange(option)}
        loadOptions={loadOptions}
        getOptionValue={(option) => option.code}
        getOptionLabel={(option) => option.language}
        placeholder='Select Language'
        isSearchable
        isClearable
        value={value === null ? '' : value}
        additional={{
          page: 1,
        }}
      />
    </Box>
  );
}

LanguageSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  width: PropTypes.number,
};
