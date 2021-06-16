import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { SourcePanelContext } from './SourcePanelContext';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  verseList: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  containerGrid: {
    height: '330px',
  },
}));

export default function SourcePanel(props) {
  const classes = useStyles();
  const { value } = props;
  const { verses } = useContext(SourcePanelContext);
  console.log(value);

  const displayChapters = () => {
    const bookValue = value.book;
    const bookChapter = value.c;
    console.log(verses);
    if (verses.length > 0) {
      return verses.map((verses, i) => {
        return (
          <Grid item xs={12} key={i}>
            <Typography gutterBottom variant='subtitle1'>
              {verses.reference.verseNumber + ' ' + verses.verseText}
            </Typography>
          </Grid>
        );
      });
    } else {
      return (
        <Typography gutterBottom variant='h6' style={{ color: 'grey' }}>
          {bookValue.toUpperCase()} {bookChapter} is not uploaded to the project
        </Typography>
      );
    }
  };

  return (
    <div>
      <Grid item xs={12} className={classes.containerGrid}>
        <Grid item xs={12} className={classes.verseList}>
          {displayChapters()}
        </Grid>
      </Grid>
    </div>
  );
}

SourcePanel.propTypes = {
  value: PropTypes.object,
};
