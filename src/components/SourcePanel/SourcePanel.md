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
const [selectProject, setSelectProject] = React.useState('');
const [source, setSource] = useState([]);
<>
  <ProjectDropDown
    onChange={setSelectProject}
    width={300}
    value={selectProject}
    componentName={'Select Project'}
  />
  <Paper className={classes.paper}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography gutterBottom variant='h6'>
          SOURCE REFERENCE
        </Typography>
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
