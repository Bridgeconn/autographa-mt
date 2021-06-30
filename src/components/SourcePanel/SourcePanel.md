This component is Source Panel.Have some bugs will fix it by Month end as soon as kavitha fixes the API

### Source Panel

```js
import ProjectDropDown from '../ProjectDropDown';
import { useState } from 'react';
import BookDropDown from '../BookDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
const [bookChapter, setBookChapter] = useState({ book: '1sa', chapter: 1 });
const [project, setProject] = useState([]);
<>
  <ProjectSelect value={project} onChange={setProject} />
  <Paper className={classes.paper}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography gutterBottom variant='h6'>
          SOURCE REFERENCE
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <BookDropDown
          selectProject={project}
          value={bookChapter}
          onChange={setBookChapter}
          width={88}
        />
      </Grid>
    </Grid>
    <SourcePanel project={project} value={bookChapter} />;
  </Paper>
</>;
```
