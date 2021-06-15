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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  icon: {
    margin: '8px',
  },
  tokenReplace: {
    margin: '15px',
  },
});
const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
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

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

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
      setTokenTranslation('');
      setTokenSelected(tokenSelected + 1);
      setOccurance(props.tokenDetail.occurrences[tokenSelected]);
    }
  };

  const previous = () => {
    if (tokenSelected > 1) {
      setTokenSelected(tokenSelected - 1);
      setOccurance(props.tokenDetail.occurrences[tokenSelected - 2]);
    }
  };

  useEffect(() => {
    const sentanceId = props.tokenDetail.occurrences[0];
    setOccurance(sentanceId);
  }, []);

  const tokenReplace = (replaceType) => {
    // if (replaceType === 'oneToken') {
    //   console.log('qqqqqqqqqqqqqqqqqqqqqqqqq');
    // }
    const data = [
      { token: token, occurrences: [occurance], translation: tokenTranslation },
    ];
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
  };

  const tokenReplaceAll = () => {
    const allOccurance = props.tokenDetail.occurrences;
    const data = [
      {
        token: token,
        occurrences: allOccurance,
        translation: tokenTranslation,
      },
    ];
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
          <NavigateBeforeIcon
            className='circle'
            fontSize='small'
            onClick={previous}
          />
        </Tooltip>
      </Grid>

      <Grid className={classes.icon}>
        <span>
          {' '}
          {tokenSelected} of {tokenTranslationCount}
        </span>
      </Grid>

      <Grid className={classes.icon}>
        <Tooltip title='Next'>
          <NavigateNextRoundedIcon fontSize='small' onClick={next} />
        </Tooltip>
      </Grid>

      <Grid className={classes.icon}>
        <Tooltip title='Replace'>
          <DoneIcon
            fontSize='small'
            onClick={() => {
              tokenReplace('oneToken');
            }}
          />
        </Tooltip>
      </Grid>

      <Grid className={classes.icon}>
        <Tooltip title='Replace All'>
          <DoneAllIcon fontSize='small' onClick={handleClickOpen} />
        </Tooltip>
        <Dialog
          onClose={handleDialogClose}
          aria-labelledby='customized-dialog-title'
          maxWidth='sm'
          open={open}
        >
          {/* <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Modal title
          </DialogTitle> */}
          <Grid container direction='row'>
            <Grid item md={12}>
              <IconButton
                fontSize='small'
                aria-label='close'
                className={classes.closeButton}
                //   onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid className={classes.tokenReplace}>
              <Button
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
            <Grid className={classes.tokenReplace}>
              <Button variant='contained' color='primary' size='small'>
                Replace All
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  );
}
