import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

export default function TranslationComponent(props) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper} style={{ width: 900 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography gutterBottom variant='body1'>
              JUDAH
            </Typography>
          </Grid>
        </Grid>
        <Typography gutterBottom variant='h6'>
          The fourth son of Jacob, one of whose descendants was to be the
          Messiah (Genesis 29:35; 49:8–12). The tribe descended from him. The
          tribal territory of his descendants which became the nucleus of
          David&apos;s kingdom and, after the kingdom had been divided into
          Israel and Judah, the southern kingdom of Judah, with Jerusalem as its
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
    </>
  );
}
