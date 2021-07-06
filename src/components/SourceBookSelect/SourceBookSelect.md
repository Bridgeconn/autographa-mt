### Source Books Dropdown

This is a demo to show a multi select dropdown with the availalbe books for a Bible Source

```js
import { useState, useEffect } from 'react';
import SourceBookSelect from './SourceBookSelect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { API } from '../../store/api';
import Box from '@material-ui/core/Box';
import SoureList from '../SourceList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const [bookList, setBookList] = React.useState([]);
const [projectBooks, setProjectBooks] = useState(['mat', 'exo']);
const [sourceBooks, setSourceBooks] = useState();
const [source, setSource] = React.useState(null);
const classes = useStyles();

useEffect(() => {
  if (source !== null) {
    API.get(`bibles/${source.sourceName}/books`)
      .then(function (response) {
        setSourceBooks(response.data);
      })
      .catch((error) => {});
  }
}, [source]);
<>
  <Box display='flex'>
    <Box mr={1}>
      <SoureList
        onChange={setSource}
        width={300}
        value={source}
        componentName={'Select Source'}
      />
    </Box>
    {sourceBooks && (
      <>
        <SourceBookSelect
          onChange={setBookList}
          buttonText='SELECT BOOKS'
          sourceBooks={sourceBooks}
          projectBooks={projectBooks}
        />
        <Button
          className={classes.button}
          variant='contained'
          color='secondary'
          size='small'
          onClick={() => setBookList([])}
        >
          Clear
        </Button>
      </>
    )}
  </Box>
  {bookList.length !== 0 && (
    <Paper component='ul' className={classes.root}>
      {bookList.map((data) => {
        return (
          <li key={data}>
            <Chip label={data} className={classes.chip} />
          </li>
        );
      })}
    </Paper>
  )}
</>;
```
