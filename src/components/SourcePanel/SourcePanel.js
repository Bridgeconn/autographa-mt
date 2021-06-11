import React from 'react';
import SourcePanelView from './SourcePanelView';
import SourcePanelContextProvider from './SourcePanelContext';

export default function SourcePanel(props) {
  return (
    <SourcePanelContextProvider {...props}>
      <SourcePanelView {...props} />
    </SourcePanelContextProvider>
  );
}
