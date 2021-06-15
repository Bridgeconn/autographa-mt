import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SourceList from '../SourceList/SourceList';
import UploadSource from '../UploadSource/UploadSource';
import BibleBooks from '../BibleDropDown/BibleBooks';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import BibleBookTable from './BibleBookTable';

const useStyles = makeStyles({
  gridLeft: {
    // paddingLeft: '80px',
    alignItems: 'center',
    fontSize: '16px',
    marginBottom: '5px',
  },
  gridRight: {
    alignItems: 'center',
    marginBottom: '5px',
  },
  dataLearn: {
    paddingLeft: '80px',
    alignItems: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  checkbox: {
    marginTop: '20px',
  },
  button: {
    paddingLeft: '20px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  // MuiDialogPaperWidthSm: {
  //   height: '600px',
  // },
  active: {
    marginTop: '40px',
  },
});

export default function EditProject(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [selectSourceLanguage, setSelectSourceLanguage] = React.useState('');
  const classes = useStyles(props);
  const [bookName, setBookName] = useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState('');
  const [responseStatus, setResponseStatus] = React.useState([]);
  const [loading, setLoading] = React.useState('');
  const [disableButton, setDisableButton] = React.useState(false);
  const [bookList, setBookList] = React.useState([]);
  const [projectBooks, setProjectBooks] = useState(['gen', 'exo']);
  const [sourceBooks, setSourceBooks] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setResponseStatus([]);
    setSelectedFiles('');
    setBookName('');
    setSelectSourceLanguage('');
    setSelectedValue('a');
    setDisableButton(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedFiles('');
    setBookName('');
    setSelectSourceLanguage('');
    setResponseStatus([]);
    setDisableButton(false);
  };

  const handleClose = () => {
    setResponseStatus([false]);
  };

  const projectData = props.projectData;
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', projectData);

  const clearState = () => {
    setSelectedFiles('');
    setBookName('');
    setSelectSourceLanguage('');
    setSelectedValue('a');
    setDisableButton(false);
  };

  const readFileAsText = (file) => {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsText(file);
    });
  };

  const loadText = () => {
    if (selectSourceLanguage) {
      setLoading(true);
      setDisableButton(true);

      const data = {
        projectId: projectData.projectId,
        selectedBooks: {
          bible: selectSourceLanguage.sourceName,
          books: bookName,
        },
      };
      API.put('autographa/projects', data)
        .then(function (response) {
          setResponseStatus([true, 'success', response.data.message]);
          clearState();
          setLoading(false);
        })
        .catch((error) => {
          setResponseStatus([true, 'error', error.response.data.error]);
          clearState();
          setLoading(false);
        });
    } else {
      setLoading(true);
      setDisableButton(true);
      let files = selectedFiles;
      let readers = [];
      for (let i = 0; i < files.length; i++) {
        readers.push(readFileAsText(files[i]));
      }

      Promise.all(readers).then((values) => {
        const data = {
          projectId: projectData.projectId,
          uploadedBooks: values,
        };
        API.put('autographa/projects', data)
          .then(function (response) {
            setResponseStatus([true, 'success', response.data.message]);
            clearState();
            setLoading(false);
          })
          .catch((error) => {
            setResponseStatus([true, 'error', error.response.data.error]);
            clearState();
            setLoading(false);
          });
      });
    }
  };
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', projectData);
  return (
    <div>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
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
        onClose={handleDialogClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>
          {'Upload Bible Books'}
        </DialogTitle>
        <DialogContent style={{ height: '300px' }}>
          <DialogContentText>
            <Grid container direction='row'>
              <Grid item md={8}>
                <Grid item container direction='row'>
                  <Grid
                    className={classes.gridLeft}
                    item
                    md={5}
                    sm={12}
                    container
                  >
                    <span>Name</span>
                  </Grid>
                  <Grid
                    className={classes.gridRight}
                    item
                    md={7}
                    sm={12}
                    container
                  >
                    : {projectData.projectName}
                  </Grid>

                  <Grid
                    className={classes.gridLeft}
                    item
                    md={5}
                    sm={12}
                    container
                  >
                    <span>Source Language</span>
                  </Grid>
                  <Grid
                    className={classes.gridRight}
                    item
                    md={7}
                    sm={12}
                    container
                  >
                    : {projectData && projectData.sourceLanguage.language}
                  </Grid>

                  <Grid
                    className={classes.gridLeft}
                    item
                    md={5}
                    sm={12}
                    container
                  >
                    <span>Target Language</span>
                  </Grid>
                  <Grid
                    className={classes.gridRight}
                    item
                    md={7}
                    sm={12}
                    container
                  >
                    : {projectData.targetLanguage.language}
                  </Grid>

                  <Grid
                    className={classes.gridLeft}
                    item
                    md={4}
                    sm={12}
                    container
                  >
                    <span>Source</span>
                  </Grid>
                  <Grid
                    className={classes.gridRight}
                    item
                    md={8}
                    sm={12}
                    container
                  >
                    <FormControlLabel
                      value='select'
                      control={
                        <Radio
                          checked={selectedValue === 'a'}
                          onChange={handleChange}
                          value='a'
                          color='default'
                          name='radio-button-demo'
                          inputProps={{ 'aria-label': 'A' }}
                          size='small'
                        />
                      }
                      label='Select'
                      labelPlacement='start'
                    />

                    <FormControlLabel
                      value='upload'
                      control={
                        <Radio
                          checked={selectedValue === 'b'}
                          onChange={handleChange}
                          value='b'
                          color='default'
                          name='radio-button-demo'
                          inputProps={{ 'aria-label': 'B' }}
                          size='small'
                        />
                      }
                      label='Upload'
                      labelPlacement='start'
                    />
                  </Grid>

                  {selectedValue == 'a' ? (
                    <Grid container direction='row'>
                      <Grid
                        className={classes.gridLeft}
                        item
                        md={7}
                        sm={6}
                        container
                        justify='center'
                      >
                        <SourceList
                          onChange={setSelectSourceLanguage}
                          width={212}
                          value={selectSourceLanguage}
                          componentName={'Select Source'}
                        />
                      </Grid>
                      {selectSourceLanguage && (
                        <Grid
                          className={classes.gridLeft}
                          item
                          md={5}
                          sm={6}
                          container
                          justify='center'
                        >
                          <BibleBooks
                            onChange={setBookList}
                            buttonText='SELECT BOOKS'
                            sourceBooks={sourceBooks}
                            projectBooks={projectBooks}
                          />
                        </Grid>
                      )}
                    </Grid>
                  ) : (
                    <Grid
                      className={classes.gridLeft}
                      item
                      md={10}
                      sm={12}
                      container
                      justify='center'
                    >
                      <UploadSource
                        projectData={projectData}
                        onChange={setSelectedFiles}
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid container direction='row' className={classes.active}>
                  <Grid
                    className={classes.gridLeft}
                    item
                    md={4}
                    sm={12}
                    container
                  >
                    <Button
                      onClick={loadText}
                      variant='contained'
                      size='small'
                      color='primary'
                      disabled={
                        !(bookName.length > 0 || selectedFiles.length > 0) ||
                        disableButton
                      }
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid
                    className={classes.gridRight}
                    item
                    md={3}
                    sm={12}
                    container
                  >
                    <Button
                      onClick={handleDialogClose}
                      variant='contained'
                      size='small'
                      color='primary'
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid
                    className={classes.gridRight}
                    item
                    md={4}
                    sm={12}
                    container
                  >
                    {loading && <CircularProgress size='1.5rem' />}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={4} container justify='flex-end'>
                <BibleBookTable projectData={projectData} />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
