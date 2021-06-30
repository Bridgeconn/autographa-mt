### Context API example

```js
import { useState } from 'react';
import SoureList from '../SourceList';
import BookDropDown from './BookDropDown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProjectSelect from '../ProjectSelect';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    maxHeight: 400,
  },
}));

const classes = useStyles();
const [bookChapter, setBookChapter] = useState({ book: 'gen', chapter: 1 });
const [source, setSource] = useState([]);
const [project, setProject] = useState([]);

<>
  <Grid container spacing={3} className={classes.gridContainer}>
    <Grid item xs={6}>
      <ProjectSelect value={project} onChange={setProject} />
      <Button
        variant='contained'
        color='primary'
        onClick={() => setSource([])}
        style={{ margin: '10px 0' }}
      >
        Clear
      </Button>
    </Grid>
    <Grid item xs={2}>
      <BookDropDown
        selectProject={project}
        value={bookChapter}
        onChange={setBookChapter}
        buttonText='BOOKS SELECTOR'
      />
    </Grid>
    <Grid item xs={2}>
      <Button
        style={{ marginLeft: 20 }}
        variant='contained'
        color='primary'
        onClick={() => setBookChapter({ book: 'gen', chapter: 1 })}
      >
        Set
      </Button>
    </Grid>
  </Grid>
</>;
```
