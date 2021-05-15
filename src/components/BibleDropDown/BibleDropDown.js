import React from 'react';
import BibleBooks from './BibleBooks';
import BookContextProvider from './BookContext';

export default function BibleDropDown() {
  return (
    <BookContextProvider>
      <BibleBooks />
    </BookContextProvider>
  );
}
