import React, { createContext } from 'react';


export const OccuranceContext = createContext();
const OccuranceContextProvider = (props) => {
    const { currentOccurance, tokenDetail, projectId } = props;
    return (
        <OccuranceContext.Provider value={{ currentOccurance: currentOccurance, tokenDetail: tokenDetail, projectId: projectId }}>
            {props.children}
        </OccuranceContext.Provider>
    );
}
export default OccuranceContextProvider;
