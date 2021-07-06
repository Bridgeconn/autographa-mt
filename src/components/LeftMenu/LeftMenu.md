### Left Menu

Demo Left Menu to show how the components can be used together

```js
import React from 'react';
import LeftMenu from './LeftMenu';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PostAdd from '@material-ui/icons/PostAdd';
import ListAlt from '@material-ui/icons/ListAlt';
import CreateProject from '../CreateProject';
import ProjectList from '../ProjectList';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 300,
  },
  title: {
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 100,
  },
  button: {
    minWidth: 80,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      {value === index && (
        <Box
          p={1}
          flexGrow={1}
          role='tabpanel'
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          {children}
        </Box>
      )}
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const classes = useStyles();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
<div>
  <CssBaseline />
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6' className={classes.title} noWrap>
        Autographa MT RCL
      </Typography>
      <Button color='inherit'>Login</Button>
    </Toolbar>
  </AppBar>
  <div className={classes.content}>
    <Tabs
      orientation='vertical'
      variant='scrollable'
      value={value}
      onChange={handleChange}
      aria-label='Vertical tabs Projects'
      className={classes.tabs}
    >
      <Tab icon={<ListAlt />} label='PROJECTS' className={classes.button} />
      <Tab icon={<PostAdd />} label='NEW' className={classes.button} />
    </Tabs>
    <TabPanel value={value} index={0} style={{ overflowX: 'auto' }}>
      <ProjectList />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <CreateProject />
    </TabPanel>
  </div>
</div>;
```
