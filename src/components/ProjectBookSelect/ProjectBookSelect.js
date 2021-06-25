import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Box } from '@material-ui/core';

export default function ProjectBookSelect(props) {
  const { project, onChange, buttonText } = props;
  const [bookButton, setBookButton] = useState('');
  const [open, setOpen] = useState(false);
  const bookClicked = (book) => {
    onChange(book);
    setOpen(false);
  };
  const getBooks = () => {
    if (project && project.metaData && project.metaData.books) {
      return project.metaData.books.map((book, i) => {
        return (
          <Grid key={i} item xs={2}>
            <Button variant='contained' onClick={() => bookClicked(book)}>
              {book}
            </Button>
          </Grid>
        );
      });
    } else {
      return '';
    }
  };
  useEffect(() => {
    if (project && project.metaData && project.metaData.books) {
      setBookButton(
        project.metaData.books.length > 0 ? (
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpen(true)}
            style={{ margin: '0 10px' }}
          >
            {buttonText}
          </Button>
        ) : (
          <Box p={1}>No Books uploaded to project</Box>
        )
      );
    } else {
      setBookButton('');
    }
  }, [project]);
  return (
    <div>
      {bookButton}
      <Dialog open={open}>
        <DialogTitle id='project-book-dialog'>Select a Book</DialogTitle>
        <DialogContent style={{ width: 500 }}>
          {' '}
          <Grid container item spacing={1}>
            {getBooks()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant='contained'
            color='primary'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ProjectBookSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  project: PropTypes.object,
};
