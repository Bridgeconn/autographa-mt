import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { API } from '../../store/api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  Linear: {
    width: '100%',
  },
  gridLeft: {
    alignItems: 'center',
    fontSize: '14px',
  },
}));

export default function UploadSource() {
  const classes = useStyles();
  const fileInput = useRef();
  const [open, setOpen] = React.useState(false);
  const [fileContent, setFileContent] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState('');
  const [currentFile, setCurrentFile] = React.useState('');
  const [progress, setProgress] = React.useState('');
  const [responseStatus, setResponseStatus] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResponseStatus([]);
    setProgress('');
    setFileContent([]);
    setSelectedFiles('');
    setCurrentFile('');
  };

  const selectFile = (e) => {
    setSelectedFiles(e.target.files);
  };

  const clearState = () => {
    setTimeout(function () {
      setResponseStatus([]);
      setProgress('');
      setFileContent([]);
      setSelectedFiles('');
      setCurrentFile('');
    }, 3000);
  };

  const apiCall = () => {
    const data = {
      projectId: 100015,
      active: true,
      selectedBooks: {
        bible: 'hin_KJV_1_bible',
        books: [],
      },
      uploadedBooks: fileContent,
      useDataForLearning: true,
    };

    API.put('autographa/projects', data)
      .then(function (response) {
        setResponseStatus([response.data.message, 'green']);
        setProgress(100);
      })
      .catch((error) => {
        setResponseStatus([error.response.data.error, 'red']);
      });

    clearState();
  };

  const loadText = () => {
    var file = selectedFiles;
    if (!file) {
      return;
    } else {
      for (var i = 0; i < file.length; i++) {
        setCurrentFile(file[i]);
        setProgress(50);
        let reader = new FileReader();
        reader.readAsText(file[i]);
        reader.onload = function () {
          setFileContent((fileContent) => [...fileContent, reader.result]);
        };
      }
    }
    apiCall();
  };

  return (
    <div>
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={handleClickOpen}
        endIcon={<PublishIcon />}
      >
        Upload
      </Button>

      <Dialog
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>
          {'Upload Bible Books'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input
              ref={fileInput}
              accept='.usfm,.sfm'
              type='file'
              onChange={selectFile}
              // multiple
            />
            <Button
              className='btn-upload'
              color='primary'
              size='small'
              variant='contained'
              component='span'
              disabled={!selectedFiles}
              onClick={loadText}
            >
              Upload
            </Button>
          </DialogContentText>

          {currentFile && (
            <Grid container direction='row'>
              <Grid className={classes.gridLeft} item md={10} sm={10} container>
                <LinearProgress
                  className={classes.Linear}
                  variant='determinate'
                  value={progress}
                />
              </Grid>
              <Grid
                justify='center'
                className={classes.gridLeft}
                item
                md={2}
                sm={2}
                container
              >
                <span>{progress}%</span>
              </Grid>
              <DialogContentText>
                <span style={{ color: responseStatus[1] }}>
                  {responseStatus[0]}
                </span>
              </DialogContentText>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
