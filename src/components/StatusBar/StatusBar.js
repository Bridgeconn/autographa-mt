import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

export default function LinearProgressWithLabel(props) {
	const classes = useStyles();
	const { progressBar } = props;

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progressBar} />
    </div>
  );
}