This component is Source Panel.

### Source Panel

```js
import SourcePanel from './SourcePanel.js';
import { useState } from 'react';
import BookDropDown from '../BookDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SoureList from '../SourceList/';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    maxHeight: 400,
  },
}));

const classes = useStyles();
const [bookChapter, setBookChapter] = useState({ book: '1sa', chapter: 1 });
const [source, setSource] = useState([]);
<>
  <Paper className={classes.paper}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography gutterBottom variant='h6'>
          SOURCE REFERENCE
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <SoureList onChange={setSource} width={190} value={source} />
      </Grid>
      <Grid item xs={2}>
        <BookDropDown
          source={source}
          width={88}
          value={bookChapter}
          onChange={setBookChapter}
        />
      </Grid>
    </Grid>
    <SourcePanel source={source} value={bookChapter} />;
  </Paper>
</>;
```
