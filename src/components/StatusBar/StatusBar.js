import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { API } from '../../store/api';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function StatusBar(props) {
  const classes = useStyles();
  const { value } = props;
  const [translated, setTranslated] = useState(0.0);
  useEffect(() => {
    if (value && Object.keys(value).length > 0) {
      API.get(`/autographa/project/progress?project_id=${value.projectId}`)
        .then((response) => {
          setTranslated((response.data.confirmed * 100).toFixed(2));
        })
        .catch((err) => console.log(err));
    }
  }, [value]);

  return (
    <div className={classes.root}>
      {!isNaN(translated) && (
        <Box display='flex' alignItems='center'>
          <Box width='100%' mr={1}>
            <LinearProgress variant='determinate' value={translated} />
          </Box>
          <Box>
            <Typography
              variant='h2'
              color='textSecondary'
              style={{ fontSize: 12 }}
            >
              {translated}%
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
}
StatusBar.propTypes = {
  value: PropTypes.object,
};
