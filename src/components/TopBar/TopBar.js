import React, { useContext, useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  customColor: {
    backgroundColor: green[500]
  },
  title: {
    flexGrow: 1
  }
}));


export default function TopBar() {
	const classes = useStyles();
  
  return (
    <React.Fragment>
			<Toolbar className={classes.customColor} >
        <IconButton
	        edge="start"
	        className={classes.menuButton}
	        color="inherit"
	        aria-label="menu"
	      >
	      <MenuIcon />
	      </IconButton>
	      <Typography variant="h6" className={classes.title}>
	        Autographa
	      </Typography>
	      <Button color="inherit">Login</Button>
      </Toolbar>
      
    </React.Fragment>
  );
}