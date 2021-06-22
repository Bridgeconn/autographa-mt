import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { makeStyles } from '@material-ui/core/styles';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  icon: {
    margin: 0,
  },

  tokenReplace: {
    textAlign: 'center',
  },
  tokeninfo: {
    marginTop: '10px',
  },
  closeButton: {
    padding:0,
  },
  closeButtonGrid:{
    textAlign:'right',
    margin:'4px'
  },
  DialogContainer:{
    width:'320px',
    paddingBottom:'15px'
  },
  replaceButton:{
    marginTop:'3px',
    paddingTop:'2px',
    paddingRight:'8px',
    paddingLeft:'8px',
    paddingBottom:'2px'
  }
});


export default function TokenTranslationUpdate(props) {
  const classes = useStyles(props);
  const projectId = props.projectId;
  const token = props.tokenDetail.token;
  const [tokenTranslation, setTokenTranslation] = useState('');
  const [occurance, setOccurance] = useState('');
  const [tokenSelected, setTokenSelected] = useState(1);
  const tokenTranslationCount = props.tokenDetail.occurrences.length;
  const [responseStatus, setResponseStatus] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setResponseStatus([false]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };


  const next = () => {
    if (tokenSelected < tokenTranslationCount) {
      setTokenSelected(tokenSelected + 1);
      setOccurance(props.tokenDetail.occurrences[tokenSelected]);
      const sentenceId = props.tokenDetail.occurrences[tokenSelected];
      const offset1 = sentenceId.offset[0];
      const offset2 = sentenceId.offset[1];
      API.get(
        `autographa/project/token-translations?project_id=${projectId}&token=${token}&sentence_id=${sentenceId.sentenceId}&offset=${offset1}&offset=${offset2}`)
        .then(function (response) {
          if(response.data.translation){ 
            setTokenTranslation(response.data.translation);
          }else{
            setTokenTranslation('');
          }
        })
        .catch((error) => {
          setResponseStatus([true, 'error', error.response.data.error]);
        });
      }
  };

  const previous = () => {
    if (tokenSelected > 1) {
      setTokenSelected(tokenSelected - 1);
      setOccurance(props.tokenDetail.occurrences[tokenSelected - 2]);
      const sentenceId = props.tokenDetail.occurrences[tokenSelected-2];
      const offset1 = sentenceId.offset[0];
      const offset2 = sentenceId.offset[1];
      API.get(
        `autographa/project/token-translations?project_id=${projectId}&token=${token}&sentence_id=${sentenceId.sentenceId}&offset=${offset1}&offset=${offset2}`)
        .then(function (response) {
          if(response.data.translation){ 
            setTokenTranslation(response.data.translation);
          }else{
            setTokenTranslation('');
          }
        })
        .catch((error) => {
          setResponseStatus([true, 'error', error.response.data.error]);
        });
    }
  };

  useEffect(() => {
    const sentenceId = props.tokenDetail.occurrences[0];
    const offset1 = sentenceId.offset[0];
    const offset2 = sentenceId.offset[1];
    API.get(
      `autographa/project/token-translations?project_id=${projectId}&token=${token}&sentence_id=${sentenceId.sentenceId}&offset=${offset1}&offset=${offset2}`)
      .then(function (response) {
        if(response.data.translation){ 
          setTokenTranslation(response.data.translation);
        }else{
          setTokenTranslation('');
        }
      })
      .catch((error) => {
        setResponseStatus([true, 'error', error.response.data.error]);
      });
      setOccurance(sentenceId)
  }, []);


  const tokenApiCall = (data) =>{
    API.put(`autographa/project/tokens?project_id=${projectId}`, data)
      .then(function (response) {
        setResponseStatus([true, 'success', response.data.message]);
        if (response.data.message === 'Token translations saved') {
          next();
        }
      })
      .catch((error) => {
        setResponseStatus([true, 'error', error.response.data.error]);
      });
  }

  const tokenReplace = (replaceType) => {
    if (replaceType === 'oneToken') {
      const data = [
        { token: token, occurrences: [occurance], translation: tokenTranslation },
      ];
      tokenApiCall(data)  
    }else if(replaceType === 'replaceAll'){
      const allOccurance = props.tokenDetail.occurrences;
      const data = [
        { token: token, occurrences:allOccurance , translation: tokenTranslation },
      ];
      tokenApiCall(data);
      handleDialogClose();
    }else if(replaceType === 'remainingTokens'){
      const remOccurance = (props.tokenDetail.occurrences).slice(tokenSelected-1);
      const data = [
        { token: token, occurrences: remOccurance, translation: tokenTranslation },
      ];
      tokenApiCall(data);
      handleDialogClose();
    }else{
      console.log("no types")
    }
        
  };

  return (
    <Grid container direction='row'>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
      <Grid item md={4}>
        <TextField
          id='outlined-password-input'
          autoComplete='current-password'
          variant='outlined'
          size='small'
          value={tokenTranslation}
          onChange={(e) => setTokenTranslation(e.target.value)}
        />
      </Grid>

      <Grid className={classes.icon}>
        <Tooltip title='Back'>
          <IconButton aria-label='close' onClick={previous}>
            <NavigateBeforeIcon className='circle' fontSize='small' />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid className={classes.tokeninfo}>
        <span>
          {' '}
          {tokenSelected} of {tokenTranslationCount}
        </span>
      </Grid>

      <Grid className={classes.icon}>
        <Tooltip title='Next'>
          <IconButton aria-label='close' onClick={next}>
            <NavigateNextRoundedIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid className={classes.icon}>
        <Tooltip title='Replace'>
          <IconButton
            aria-label='close'
            onClick={() => {
              tokenReplace('oneToken');
            }}
          >
            <DoneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid className={classes.icon}>
        <Tooltip title='Replace All'>
          <IconButton aria-label='close' onClick={handleClickOpen}>
            <DoneAllIcon fontSize='small' />
          </IconButton>
        </Tooltip>

        <Dialog
          onClose={handleDialogClose}
          aria-labelledby='customized-dialog-title'
          maxWidth='sm'
          open={open}
        >
          <Grid container direction='row' className={classes.DialogContainer}>
            <Grid className={classes.closeButtonGrid} item md={12}>
              <IconButton
                fontSize='small'
                aria-label='close'
                className={classes.closeButton}
                  onClick={handleDialogClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item md={7} className={classes.tokenReplace}>
              <Button
              className={classes.replaceButton}
                variant='contained'
                color='primary'
                size='small'
                onClick={() => {
                  tokenReplace('remainingTokens');
                }}
              >
               Replace Remaining
              </Button>
              </Grid>
            <Grid item md={5} className={classes.tokenReplace}>
              <Button className={classes.replaceButton} variant='contained' color='primary' size='small' onClick={() => {
                  tokenReplace('replaceAll');
                }}>
                Replace All
              </Button>
              </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  );
}
