import React from 'react';
import PropTypes from 'prop-types';
import BibleBooks from './BibleBooks';
import BookContextProvider from './BookContext';

export default function BibleDropDown() {
  return (
    <BookContextProvider>
      <BibleBooks />
    </BookContextProvider>
  );
}
BibleDropDown.propTypes = {
  onChange: PropTypes.func,
};
