### Drag And Drop

```js
import SourcePanel from '../SourcePanel';
import DragAndDrop from './DragAndDrop';
import { useState } from 'react';
import BookDropDown from '../BookDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { bibleTitus } from '../../store/bible';
import SoureList from '../SourceList/';
import ProjectList from '../ProjectList';
import CreateProject from '../CreateProject';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    maxHeight: 400,
  },
}));

const classes = useStyles();
const SourcePanelComponent = () => {
  const [bookChapter, setBookChapter] = useState({ book: '1sa', chapter: 1 });
  const [source, setSource] = useState([]);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography gutterBottom variant='h6'>
            SOURCE REFERENCE
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <SoureList onChange={setSource} width={150} value={source} />
        </Grid>
        <Grid item xs={2} style={{ paddingLeft: 0 }}>
          <BookDropDown
            source={source}
            width={88}
            value={bookChapter}
            onChange={setBookChapter}
          />
        </Grid>
      </Grid>
      <SourcePanel source={source} value={bookChapter} />
    </Paper>
  );
};

const dragDropComponents = [
  {
    name: <ProjectList />,
    id: 'cato',
  },
  {
    name: (
      <>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography gutterBottom variant='h6'>
              TRANSLATION WORD
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography gutterBottom variant='body1'>
              JUDAH
            </Typography>
          </Grid>
        </Grid>
        <Typography gutterBottom variant='h10'>
          The fourth son of Jacob, one of whose descendants was to be the
          Messiah (Genesis 29:35; 49:8–12). The tribe descended from him. The
          tribal territory of his descendants which became the nucleus of
          David's kingdom and, after the kingdom had been divided into Israel
          and Judah, the southern kingdom of Judah, with Jerusalem as its centre
        </Typography>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='subtitle1'>
              Strongs :
            </Typography>
          </Grid>
        </Grid>
        <Typography gutterBottom variant='subtitle2'>
          H3063
        </Typography>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='subtitle1'>
              See Also :
            </Typography>
          </Grid>
        </Grid>
        <Typography gutterBottom variant='subtitle2'>
          Judah, Salt Sea
        </Typography>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='subtitle1'>
              Ref :
            </Typography>
          </Grid>
        </Grid>
        <Typography gutterBottom variant='subtitle2'>
          1 Samuel 30:26, 2 Samuel 12:8, Hosea 5:14,Jeremiah 7:33, Judges
          1:16-17
        </Typography>
      </>
    ),
    id: 'kvin',
  },
  {
    name: <SourcePanelComponent />,
    id: 'kving',
  },
];

<DragAndDrop componentObject={dragDropComponents} />;
```
