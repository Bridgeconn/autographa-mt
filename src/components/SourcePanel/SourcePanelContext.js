import React, { createContext, useEffect, useState } from 'react';
import { API } from '../../store/api';
import PropTypes from 'prop-types';
import { bibleChapters, bibleBooks } from '../../store/bibleData';

export const SourcePanelContext = createContext();

const SourcePanelContextProvider = (props) => {
  const [verses, setVerses] = useState([]);
  const { value, source } = props;
  useEffect(() => {
    // const from = bookId * 1000000 + chapter * 1000 + 001;
    // const to = bookId * 1000000 + chapter * 1000 + 999;
    // API.get(
    //   `/autographa/project/sentences?project_id=100061&sentence_id_range=${from}&sentence_id_range=${to}&with_draft=false`
    // )
    //   .then((response) => {
    //     setVerses(response.data);
    //   })
    //   .catch((err) => console.log(err));
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
