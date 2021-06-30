import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { StatusBarContext } from './StatusBarContext';
import { Typography } from '@material-ui/core';

import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress
          variant='determinate'
          // {...props}
          value={props.translated}
        />
      </Box>
      <Box minWidth={30} style={{ align: 'top' }}>
        {props.value === 0 ? (
          <Typography
            variant='h2'
            color='textSecondary'
            style={{ fontSize: 12 }}
          >
            {props.percent}%
          </Typography>
        ) : (
          <Typography
            variant='h2'
            color='textSecondary'
            style={{ fontSize: 12 }}
          >
            0%
          </Typography>
        )}
      </Box>
      <Box minWidth={65} style={{ align: 'left' }}>
        {props.value === 0 ? (
          <Typography
            variant='h2'
            color='textSecondary'
            style={{ fontSize: 12 }}
          >
            {props.percent}% {props.translated}/{props.value}
          </Typography>
        ) : (
          <Typography
            variant='h2'
            color='textSecondary'
            style={{ fontSize: 12 }}
          >
            0 /0
          </Typography>
        )}
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  translated: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function StatusBarView(props) {
  const { progressData } = useContext(StatusBarContext);
  const classes = useStyles();
  let translation = 0;
  translation = progressData.confirmed;
  const result =
    progressData.confirmed +
    progressData.suggestion +
    progressData.untranslated;

  let progressPercent = 0;
  if (result !== 0) {
    progressPercent = Math.floor((translation / result) * 100);
  }

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel
        value={result}
        translated={translation}
        percent={progressPercent}
      />
    </div>
  );
}
