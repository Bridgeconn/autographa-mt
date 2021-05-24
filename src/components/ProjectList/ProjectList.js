import React from 'react';
import ProjectListView from './ProjectListView';
import ProjectContextProvider from './ProjectContext';

export default function ProjectList() {
  return (
    <ProjectContextProvider>
      <ProjectListView />
    </ProjectContextProvider>
  );
}
