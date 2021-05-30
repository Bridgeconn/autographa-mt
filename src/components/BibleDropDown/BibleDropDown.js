import React from 'react';
import BibleBooks from './BibleBooks';
import BookContextProvider from './BookContext';
import PropTypes from 'prop-types';

export default function BibleDropDown(props) {
  return (
    <BookContextProvider>
      <BibleBooks {...props} />
    </BookContextProvider>
  );
}

BibleDropDown.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
};
