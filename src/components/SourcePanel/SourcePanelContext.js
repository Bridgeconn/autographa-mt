import React, { createContext, useEffect, useState } from 'react';
import { API } from '../../store/api';
import PropTypes from 'prop-types';

export const SourcePanelContext = createContext();

const SourcePanelContextProvider = (props) => {
  const [verses, setVerses] = useState([]);
  const { value, source } = props;
  useEffect(() => {
    API.get(
      `/bibles/${source.sourceName}/verses?book_code=${value.book}&chapter=${value.chapter}&active=true&limit=200`
    )
      .then((response) => {
        setVerses(response.data);
      })
      .catch((err) => console.log(err));
  }, [value, source]);

  return (
    <SourcePanelContext.Provider
      value={{
        verses: verses,
      }}
    >
      {props.children}
    </SourcePanelContext.Provider>
  );
};

SourcePanelContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
};

export default SourcePanelContextProvider;
