import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Checkbox, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { BookContext } from './BookContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  bookButton: {
    width: 90,
    padding: '0 8px',
  },
  bookCard: {
    width: 700,
  },
  margin: {
    margin: theme.spacing(1),
  },
  checkBox: {
    padding: 5,
  },
  label: {
    marginRight: 0,
    width: 70,
  },
}));

export default function BibleBooks(props) {
  const classes = useStyles();
  const { books } = useContext(BookContext);
  const { value, onChange } = props;
  const [bookList, setBookList] = React.useState(value);
  const [open, setOpen] = React.useState(false);

  const closeBookListing = () => {
    onChange(bookList);
    setOpen(false);
  };

  const handleChange = (e) => {
    const checkedName = e.target.name;
    const books = [...bookList];
    if (books.includes(checkedName)) {
      const bookIndex = books.indexOf(checkedName);
      books.splice(bookIndex, 1);
    } else {
      books.push(checkedName);
    }
    setBookList(books);
  };

  const displayOldBooks = () => {
    const Books = [];
    for (const i in books) {
      Books.push(books[i].bookCode);
    }
    return Books.map((book, i) => {
      const checked = bookList.includes(book) ? true : '';
      return (
        <Grid item xs={2} key={i}>
          <Button
            size='small'
            variant='contained'
            className={classes.bookButton}
          >
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  className={classes.checkBox}
                  checked={checked}
                  name={book}
                  onClick={handleChange}
                />
              }
              label={book}
            />
          </Button>
        </Grid>
      );
    });
  };

  const handleSelectBooks = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button
        size='sm'
        variant='contained'
        color='primary'
        onClick={handleSelectBooks}
      >
        BOOKS
      </Button>
      <Dialog open={open} className={classes.bookCard} maxWidth='md'>
        <DialogContent>
          <Typography variant='h5'>SELECT BOOKS</Typography>
          <Grid container item spacing={1}>
            {displayOldBooks()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeBookListing}
            variant='contained'
            color='secondary'
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

BibleBooks.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
};
