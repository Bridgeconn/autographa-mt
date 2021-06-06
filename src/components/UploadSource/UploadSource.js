import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export default function UploadSource(props) {
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

UploadSource.propTypes = {
  onChange: PropTypes.array,
};
