import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SourceList from '../SourceList/SourceList';
import UploadSource from '../UploadSource/UploadSource';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridLeft: {
    paddingLeft: '80px',
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
  MuiDialogPaperWidthSm: {
    height: '600px',
  },
});

export default function EditProject(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [selectSourceLanguage, setSelectSourceLanguage] = React.useState('');
  const classes = useStyles(props);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const project = props.projectData;
  console.log('oooooooooooooo', project);

  const apiCall = () => {
    const data = {
      projectId: projectDetails.projectId,
      active: projectDetails.active,
      // selectedBooks: {
      //   bible: projectDetails.,
      //   books: [],
      // },
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
        <DialogContent style={{ height: '250px' }}>
          <DialogContentText>
            <Grid container direction='row'>
              {/* <SnackBar
                responseStatus={responseStatus}
                handleClose={handleClose}
              /> */}
              <Grid className={classes.gridLeft} item md={5} sm={12} container>
                <span>Name</span>
              </Grid>
              <Grid className={classes.gridRight} item md={7} sm={12} container>
                : {project.projectName}
              </Grid>

              <Grid className={classes.gridLeft} item md={5} sm={12} container>
                <span>Source Language</span>
              </Grid>
              <Grid className={classes.gridRight} item md={7} sm={12} container>
                : {project.sourceLanguage.language}
              </Grid>

              <Grid className={classes.gridLeft} item md={5} sm={12} container>
                <span>Target Language</span>
              </Grid>
              <Grid className={classes.gridRight} item md={7} sm={12} container>
                : {project.targetLanguage.language}
              </Grid>

              <Grid className={classes.gridLeft} item md={4} sm={12} container>
                <span>Source</span>
              </Grid>
              <Grid className={classes.gridRight} item md={8} sm={12} container>
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
                <Grid
                  className={classes.gridLeft}
                  item
                  md={10}
                  sm={12}
                  container
                  justify='center'
                >
                  <SourceList
                    onChange={setSelectSourceLanguage}
                    width={212}
                    value={selectSourceLanguage}
                  />
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
                  <UploadSource projectData={project} />
                </Grid>
              )}
            </Grid>
          </DialogContentText>
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
