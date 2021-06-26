import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SourceList from '../SourceList/SourceList';
import UploadProjectBook from '../UploadProjectBook/UploadProjectBook';
import BibleDropDown from '../BibleDropDown/BibleDropDown';
import { API } from '../../store/api';
import SnackBar from '../SnackBar/SnackBar.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import BibleBookTable from './BibleBookTable';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  gridLeft: {
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

  active: {
    marginTop: '40px',
  },
});

export default function EditProject(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [selectSourceLanguage, setSelectSourceLanguage] = React.useState('');
  const classes = useStyles(props);
  const [selectedFiles, setSelectedFiles] = React.useState('');
  const [responseStatus, setResponseStatus] = React.useState([]);
  const [loading, setLoading] = React.useState('');
  const [disableButton, setDisableButton] = React.useState(false);
  const [bookList, setBookList] = React.useState([]);
  const [sourceBooks, setSourceBooks] = useState();
  const [projectData, setProjectData] = React.useState();

  const fetchProjectData = () => {
    const projectName = props.projectName;
    API.get(`autographa/projects?project_name=${projectName}`)
      .then(function (response) {
        setProjectData(response.data[0]);
      })
      .catch((error) => {
        console.log('error', error);
        setResponseStatus([true, 'error', 'Error Fetching Project']);
      });
  };

  const handleClickOpen = () => {
    fetchProjectData();
    setOpen(true);
  };

  useEffect(() => {
    API.get('bibles/en_KJV_1_bible/books')
      .then(function (response) {
        setSourceBooks(response.data);
      })
      .catch((error) => {
        console.log('error', error);
        setResponseStatus([true, 'error', 'Error Fetching Source Books']);
      });
  }, [selectSourceLanguage]);

  const handleDialogClose = () => {
    setOpen(false);
    setResponseStatus([]);
    setSelectedFiles('');
    setBookList('');
    setSelectSourceLanguage('');
    setSelectedValue('a');
    setDisableButton(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedFiles('');
    setBookList('');
    setSelectSourceLanguage('');
    setResponseStatus([]);
    setDisableButton(false);
  };

  const handleClose = () => {
    setResponseStatus([false]);
  };

  const clearState = () => {
    setSelectedFiles('');
    setBookList('');
    setSelectSourceLanguage('');
    setSelectedValue('a');
    setDisableButton(false);
    setLoading(false);
  };

  const readFileAsText = (file) => {
    return new Promise(function (resolve, reject) {
      const fr = new FileReader();

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
          books: bookList,
        },
      };
      API.put('autographa/projects', data)
        .then(function (response) {
          setResponseStatus([true, 'success', response.data.message]);
          clearState();
          fetchProjectData();
        })
        .catch((error) => {
          setResponseStatus([true, 'error', error.response.data.error]);
          clearState();
        });
    } else if (selectedFiles.length > 0) {
      setLoading(true);
      setDisableButton(true);
      const files = selectedFiles;
      const readers = [];
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
            fetchProjectData();
            clearState();
          })
          .catch((error) => {
            setResponseStatus([true, 'error', error.response.data.error]);
            clearState();
          });
      });
    } else {
      setResponseStatus([true, 'error', 'Select any books']);
    }
  };

  return (
    <div>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
      <Tooltip title='Edit Project'>
        <IconButton aria-label='close' onClick={handleClickOpen}>
          <EditIcon className='circle' fontSize='small' />
        </IconButton>
      </Tooltip>

      {projectData && (
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

                    {selectedValue === 'a' ? (
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
                            <BibleDropDown
                              onChange={setBookList}
                              buttonText='SELECT BOOKS'
                              sourceBooks={sourceBooks}
                              projectBooks={projectData.metaData.books}
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
                        <UploadProjectBook
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
                        disabled={disableButton}
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
                        close
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
      )}
    </div>
  );
}
EditProject.propTypes = {
  projectName: PropTypes.string.isRequired,
};
