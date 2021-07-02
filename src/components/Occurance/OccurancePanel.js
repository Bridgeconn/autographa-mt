import React, { useContext, useEffect } from 'react';
import { OccuranceContext } from './OccuranceContext';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { API } from '../../store/api';
import LaunchIcon from '@material-ui/icons/Launch';
import TranslateIcon from '@material-ui/icons/Translate';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  Paper: {
    width: '300px',
    height: '300px',
    borderRadius: '15px',
  },
  root: {
    padding: '10px',
  },

  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  h1: {
    fontWeight: 'bold',
  },
  OccuranceSroll: {
    marginTop: '10px',
    maxHeight: '250px',
    overflow: 'scroll',
    scrollbarWidth: 'none',
  },
  sentence: {
    textAlign: 'justify',
    fontSize: 13,
    marginBottom: '2px',
    lineHeight: 1,
  },
  bookName: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  iconSize: {
    fontSize: 15,
  },
  Divider: {
    marginTop: '4px',
  },
});

export default function OccurancePanel(props) {
  const classes = useStyles(props);
  const { currentOccurance, tokenDetail, projectId } =
    useContext(OccuranceContext);
  const [occurance, setOccurance] = React.useState(props.occurance);

  useEffect(() => {
    if (tokenDetail.occurrences.length > 0) {
      let occuranceList = '';
      tokenDetail.occurrences.forEach((i) => {
        occuranceList += `sentence_id_list=${i.sentenceId}` + '&';
      });
      API.get(
        `autographa/project/sentences?project_id=${projectId}&${occuranceList}with_draft=true`
      )
        .then(function (response) {
          if (response.data) {
            setOccurance(response.data);
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [currentOccurance]);

  const DisplayOccurance = () => {
    if (occurance.length > 0) {
      return tokenDetail.occurrences.map((i, k) => {
        const index = occurance.findIndex(
          (item) => item.sentenceId === i.sentenceId
        );
        const occ = occurance[index];
        const sourceOffset = i.offset;
        const offsetIndex = occ.draftMeta.findIndex(
          (item) => item[0][0] === sourceOffset[0]
        );
        const text = occ.draft;
        const displayText = [];
        if (offsetIndex !== -1) {
          const offset = occ.draftMeta[offsetIndex][1];
          displayText[0] = text.slice(0, offset[0]);
          displayText[1] = text.slice(offset[0], offset[1]);
          displayText[2] = text.slice(offset[1]);
        }
        return (
          <Grid
            container
            direction='row'
            key={k}
            style={{
              backgroundColor: k === currentOccurance - 1 ? '#dde2eb' : '',
            }}
          >
            <Grid item md={4} className={classes.bookName}>
              {occ.surrogateId}
            </Grid>
            <Grid item md={2}>
              <Tooltip title='Open Source Panel' placement='right'>
                <LaunchIcon className={classes.iconSize} />
              </Tooltip>
            </Grid>
            <Grid item md={1}>
              <Tooltip title={occ.sentence} placement='right'>
                <TranslateIcon className={classes.iconSize} />
              </Tooltip>
            </Grid>
            <Grid item md={12} className={classes.sentence}>
              {offsetIndex === -1 ? (
                occ.draft
              ) : (
                <span>
                  {displayText[0]} <b> {displayText[1]}</b> {displayText[2]}
                </span>
              )}
              <Divider className={classes.Divider} />
            </Grid>
          </Grid>
        );
      });
    }
  };
  return (
    <Paper elevation={3} className={classes.Paper}>
      <Grid className={classes.root} container direction='row'>
        <Grid item md={4}>
          <span className={classes.h1}>Occurances</span>
        </Grid>
        <Grid item md={3} className={classes.center}>
          {currentOccurance || '0'}/
          {tokenDetail ? tokenDetail.occurrences.length : '0'}
        </Grid>
        <Grid item md={12}>
          <Grid className={classes.OccuranceSroll}>
            {occurance && DisplayOccurance()}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
OccurancePanel.propTypes = {
  occurance: PropTypes.number,
};
