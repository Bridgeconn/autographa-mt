import React, { createContext, useEffect, useState } from 'react';
import { API } from '../../store/api';
import PropTypes from 'prop-types';

export const ProjectsContext = createContext();

const ProjectsContextProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState(true);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    API.get(`/autographa/projects?active=${activeProjects}&limit=100`)
      .then((response) => {
        setProjects(response.data);
        setReload(false);
      })
      .catch((err) => console.log(err));
  }, [reload, setReload, activeProjects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects: projects,
        setReload: setReload,
        activeProjects: activeProjects,
        setActiveProjects: setActiveProjects,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

ProjectsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProjectsContextProvider;
