import React, { createContext, useState, useEffect } from 'react';
import { API } from '../../store/api';
import PropTypes from 'prop-types';
export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('lookup/bible/books?limit=100')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BookContext.Provider value={{ books }}>
      {props.children}
    </BookContext.Provider>
  );
};

BookContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookContextProvider;
