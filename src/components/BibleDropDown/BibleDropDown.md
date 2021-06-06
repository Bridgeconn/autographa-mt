```js
import { useState } from 'react';
import BibleDropDown from './BibleDropDown';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

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

const [bookName, setBookName] = useState([]);
const classes = useStyles();

<>
  <BibleDropDown
    value={bookName}
    onChange={setBookName}
    buttonText='SELECT BOOKS'
  />
  <Button
    className={classes.button}
    variant='contained'
    color='secondary'
    size='small'
    onClick={() => setBookName([])}
  >
    Clear
  </Button>
  {bookName.length !== 0 && (
    <Paper component='ul' className={classes.root}>
      {bookName.map((data) => {
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
