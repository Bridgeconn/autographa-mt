import React, { useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Checkbox, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { BookContext } from './BookContext';
import { green } from '@material-ui/core/colors';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const GreenCheckbox = withStyles({
  root: {
    // padding: 5,
    padding: '0 5px',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const useStyles = makeStyles((theme) => ({
  bookButton: {
    padding: '0 8px',
    width: '71px',
  },
  bookCard: {
    width: 580,
  },
  label: {
    marginRight: 0,
    width: 60,
  },
  labelSelect: {
    marginRight: 20,
    paddingLeft: '58px',
    width: 150,
  },
}));

export default function BibleBooks(props) {
  const classes = useStyles();
  const { books } = useContext(BookContext);
  const { value, onChange, buttonText } = props;
  const [bookList, setBookList] = React.useState(value);
  const [open, setOpen] = React.useState(false);

  const closeBookListing = () => {
    const data = [];
    books.forEach((book) => {
      if (bookList.includes(book.bookCode)) {
        data.push(book.bookCode);
      }
    });
    onChange(data);
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

  useEffect(() => {
    setBookList(value);
  }, [value]);

  const displayBooks = () => {
    return books.map((bookObject, i) => {
      const book = bookObject.bookCode;
      const checked = bookList.includes(book) ? true : '';
      return (
        <Grid item xs={2} key={i}>
          <Button
            size='small'
            variant='outlined'
            className={classes.bookButton}
          >
            <FormControlLabel
              className={classes.label}
              control={
                <GreenCheckbox
                  icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                  checkedIcon={<CheckBoxIcon fontSize='small' />}
                  name={book}
                  checked={checked}
                  onClick={handleChange}
                />
              }
              // label={book}
              label={<span style={{ fontSize: 15 }}>{book}</span>}
            />
          </Button>
        </Grid>
      );
    });
  };

  const handleSelectAll = (e) => {
    const checkedName = e.target.checked;
    const Books = [];
    if (checkedName === true) {
      for (const i in books) {
        Books.push(books[i].bookCode);
      }
    }
    setBookList(Books);
  };

  const displaySelectAll = () => {
    const checked = bookList.length === books.length ? true : '';
    return (
      <FormControlLabel
        className={classes.labelSelect}
        label={<Typography variant='h6'>Select All</Typography>}
        labelPlacement='start'
        control={
          <GreenCheckbox
            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
            checkedIcon={<CheckBoxIcon fontSize='small' />}
            onClick={handleSelectAll}
            checked={checked}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
      />
    );
  };

  const handleSelectBooks = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={handleSelectBooks}
      >
        {buttonText || 'BOOKS'}
      </Button>
      <Dialog open={open} className={classes.bookCard}>
        <DialogTitle id='simple-dialog-title'>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant='h5'>SELECT BOOKS</Typography>
            </Grid>
            <Grid item xs={6}>
              {displaySelectAll()}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container item spacing={1}>
            {displayBooks()}
          </Grid>
        </DialogContent>
        <DialogActions style={{ paddingRight: '5%' }}>
          <Button
            onClick={closeBookListing}
            variant='contained'
            color='primary'
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

BibleBooks.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  buttonText: PropTypes.string,
};
