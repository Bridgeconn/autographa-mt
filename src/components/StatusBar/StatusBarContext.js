import React, { createContext, useEffect, useState } from 'react';
import { API } from '../../store/api';
import PropTypes from 'prop-types';

export const StatusBarContext = createContext();

const StatusBarContextProvider = (props) => {
  const { value } = props;
  const [progressData, setprogressData] = useState([]);
  useEffect(() => {
    API.get(`/autographa/project/progress?project_id=${value.projectId}`)
      .then((response) => {
        setprogressData(response.data);
      })
      .catch((err) => console.log(err));
  }, [value]);

  // console.log(progressData);

  return (
    <StatusBarContext.Provider
      value={{
        progressData: progressData,
      }}
    >
      {props.children}
    </StatusBarContext.Provider>
  );
};

StatusBarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object,
};

export default StatusBarContextProvider;
