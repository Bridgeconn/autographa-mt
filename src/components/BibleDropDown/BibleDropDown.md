```js
import { useState } from 'react';
import BibleDropDown from './BibleDropDown';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { API } from '../../store/api';
import Grid from '@material-ui/core/Grid';

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
const classes = useStyles();

const loadBibleBooks = () => {
  API.get('bibles/en_KJV_1_bible/books')
    .then(function (response) {
      setSourceBooks(response.data);
    })
    .catch((error) => {
    });
};

<>
  <Grid container direction='row'>
    <Grid item md={3}>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        size='small'
        onClick={loadBibleBooks}
      >
        Load Bible
      </Button>
    </Grid>
    {sourceBooks && (
      <BibleDropDown
        onChange={setBookList}
        buttonText='SELECT BOOKS'
        sourceBooks={sourceBooks}
        projectBooks={projectBooks}
      />
    )}
    <Button
      className={classes.button}
      variant='contained'
      color='secondary'
      size='small'
      onClick={() => setBookList([])}
    >
      Clear
    </Button>
  </Grid>
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
