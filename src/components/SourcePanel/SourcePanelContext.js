import React, { createContext, useEffect, useState } from 'react';
import { API } from '../../store/api';
import PropTypes from 'prop-types';
import { bibleBooks } from '../../store/bibleData';

export const SourcePanelContext = createContext();

const SourcePanelContextProvider = (props) => {
  const [verses, setVerses] = useState([]);
  const { value, project } = props;
  let bookId = 0;
  for (const i in bibleBooks) {
    if (bibleBooks[i].abbreviation === value.book) {
      bookId = bibleBooks[i].bookId;
    }
  }

  useEffect(() => {
    const from = bookId * 1000000 + value.chapter * 1000 + 1;
    const to = bookId * 1000000 + value.chapter * 1000 + 999;
    API.get(
      `/autographa/project/sentences?project_id=${project.projectId}&sentence_id_range=${from}&sentence_id_range=${to}&with_draft=false`
    )
      .then((response) => {
        setVerses(response.data);
      })
      .catch((err) => console.log(err));
  }, [value, project]);

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
  project: PropTypes.object.isRequired,
};

export default SourcePanelContextProvider;
