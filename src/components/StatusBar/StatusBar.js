import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
};

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

export default function StatusBar(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(10);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={props.value} />
    </div>
  );
}
