import React, { useState } from 'react';
import SourcePanel from '../SourcePanel';
import SoureList from '../SourceList/';
// import ProjectList from '../ProjectList';
import BookDropDown from '../BookDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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

export default function TranslationComponent() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const dialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Paper className={classes.paper} style={{ width: 900 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography gutterBottom variant='h6'>
                TRANSLATION WORD
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ paddingLeft: 0 }}>
              <IconButton
                aria-label='close'
                className={classes.closeButton}
                onClick={dialogClose}
              >
                <CloseIcon />
              </IconButton>
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
            and Judah, the southern kingdom of Judah, with Jerusalem as its
            centre
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
        </Paper>
      )}
    </>
  );
}
