This component is Source Panel.

### Create Project

```js
import SourcePanel from './SourcePanel.js';
import { useState } from 'react';
import BookDropDown from '../BookDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { bibleTitus } from '../../store/bible';
import { SourcePanelContext } from './SourcePanelContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    maxHeight: 400,
  },
}));


const bookP = bibleTitus;
const classes = useStyles();
const [bookChapter, setBookChapter] = useState({ book: '1sa', chapter: 1 });
<>
  <Paper className={classes.paper}>
    <Grid container spacing={3} className={classes.gridContainer}>
      <Grid item xs={6}>
        <Typography gutterBottom variant='h6'>
          SOURCE REFERENCE
        </Typography>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={3}>
        <BookDropDown
          value={bookChapter}
          onChange={setBookChapter}
          buttonText='BOOKS SELECTOR'
        />
      </Grid>
    </Grid>
    <SourcePanel value={bookChapter} />
  </Paper>
</>;
```
