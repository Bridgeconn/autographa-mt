import React, { createContext, useState, useEffect } from 'react';
import { API } from '../../store/api';
export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('https://www.api.vachanonline.net/v1/booknames')
      .then((response) => {
        setBooks(
          response.data[0].bookNames.sort((a, b) => a.book_id - b.book_id)
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BookContext.Provider value={{ books }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
