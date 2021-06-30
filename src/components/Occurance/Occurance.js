import React from 'react';
import OccurancePanel from './OccurancePanel';
import OccuranceContextProvider from './OccuranceContext';


export default function Occurance(props) {
    return (
        <OccuranceContextProvider {...props} >
            <OccurancePanel />
        </OccuranceContextProvider>
    );
}


