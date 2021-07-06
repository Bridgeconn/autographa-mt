import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const OccuranceContext = createContext();
const OccuranceContextProvider = (props) => {
  const { currentOccurance, tokenDetail, projectId } = props;
  return (
    <OccuranceContext.Provider
      value={{
        currentOccurance: currentOccurance,
        tokenDetail: tokenDetail,
        projectId: projectId,
      }}
    >
      {props.children}
    </OccuranceContext.Provider>
  );
};
OccuranceContextProvider.propTypes = {
  currentOccurance: PropTypes.number,
  children: PropTypes.node,
  tokenDetail: PropTypes.object,
  projectId: PropTypes.number,
};
export default OccuranceContextProvider;
