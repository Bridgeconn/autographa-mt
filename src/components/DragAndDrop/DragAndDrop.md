### Drag And Drop

```js
import SourcePanel from '../SourcePanel';
import DragAndDrop from './DragAndDrop';
import TranslationComponent from './TranslationComponent';
import { useState } from 'react';
import BookDropDown from '../BookDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SoureList from '../SourceList/';
import ProjectList from '../ProjectList';
import CreateProject from '../CreateProject';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));

const classes = useStyles();
const SourcePanelComponent = () => {
  const [bookChapter, setBookChapter] = useState({ book: '1sa', chapter: 1 });
  const [source, setSource] = useState([]);
  const [open, setOpen] = React.useState(true);

  const dialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Paper className={classes.paper} style={{ width: 900 }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={5}
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <Typography gutterBottom variant='body1'>
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
            <Grid item xs={1} style={{ paddingLeft: 0 }}>
              <IconButton
                aria-label='close'
                className={classes.closeButton}
                onClick={dialogClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <SourcePanel source={source} value={bookChapter} />
        </Paper>
      )}
    </>
  );
};

const dragDropComponents = [
  {
    name: <TranslationComponent />,
    id: 'kvin',
  },
  {
    name: <SourcePanelComponent />,
    id: 'kving',
  },
];

<>
  <DragAndDrop componentObject={dragDropComponents} />
</>;
```
