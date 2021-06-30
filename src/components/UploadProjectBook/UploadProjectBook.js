import React from 'react';
import PropTypes from 'prop-types';

export default function UploadProjectBook(props) {
  return (
    <div>
      <input
        accept='.usfm,.sfm'
        type='file'
        onChange={(e) => props.onChange(e.target.files)}
        multiple
      />
    </div>
  );
}

UploadProjectBook.propTypes = {
  onChange: PropTypes.func,
};
