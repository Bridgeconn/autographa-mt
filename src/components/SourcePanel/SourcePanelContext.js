import React, { createContext, useEffect, useState } from 'react';
import { API } from '../../store/api';
import PropTypes from 'prop-types';

export const SourcePanelContext = createContext();

const SourcePanelContextProvider = (props) => {
  const [verses, setVerses] = useState([]);
  const { value } = props;
  console.log('SOURCEPANELVALUE', value);

  useEffect(() => {
    API.get(`/bibles/hi_IRV_1_bible/verses?active=true&skip=0&limit=100`)
      .then((response) => {
        setVerses(response.data);
        console.log('SOURCEPANEL', response);
      })
      .catch((err) => console.log(err));
  }, []);

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
  value: PropTypes.object,
};

export default SourcePanelContextProvider;
