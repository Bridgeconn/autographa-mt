import React from 'react';
import StatusBarView from './StatusBarView';
import StatusBarContextProvider from './StatusBarContext';

export default function StatusBar(props) {
  return (
    <StatusBarContextProvider {...props}>
      <StatusBarView {...props} />
    </StatusBarContextProvider>
  );
}
