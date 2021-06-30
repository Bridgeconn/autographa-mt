import React, { useState } from 'react';
import SourcePanel from '../SourcePanel';
import SoureList from '../SourceList/';
// import ProjectList from '../ProjectList';
import BookDropDown from '../BookDropDown';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

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

export default function SourcePanelComponent(props) {
  const classes = useStyles();
  const [bookChapter, setBookChapter] = useState({ book: '1sa', chapter: 1 });
  const [source, setSource] = useState([]);

  return (
    <>
      {props.sourceReferenceStatus && (
        <Paper
          className={classes.paper}
          style={{
            width: '900px',
            height: '100%',
            margin: 'auto',
            padding: '16px',
            maxWidth: '500px',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={5}
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            ></Grid>
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
      )}
    </>
  );
}

SourcePanelComponent.propTypes = {
  sourceReferenceStatus: PropTypes.any,
};
