import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Checkbox } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { green } from '@material-ui/core/colors';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const GreenCheckbox = withStyles({
  root: {
    padding: '0 5px',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const DisabledCheckbox = withStyles({
  root: {
    padding: '0 5px',
    '&$checked': {
      color: '#c2bebe',
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  bookButton: {
    padding: '0 8px',
    width: '80px',
    margin: '4px',
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

  DialogTitle: {
    fontWeight: 'bold',
  },
  DialogContent: {
    paddingLeft: '5px',
    paddingRight: '5px',
    width: '590px',
  },
  displayBooks: {
    paddingLeft: '30px',
    marginTop: '5px',
  },
  displaySelectAll: {
    paddingLeft: '20px',
  },
  DialogActions: {
    paddingRight: '5%',
  },
}));

export default function SourceBookSelect(props) {
  const classes = useStyles();
  const { projectBooks, onChange, buttonText, sourceBooks } = props;
  const [bookList, setBookList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectAll, setSelectAll] = React.useState(false);

  const addBooks = () => {
    onChange(bookList);
    dialogClose();
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

  const displayBooks = () => {
    if (sourceBooks) {
      return sourceBooks.map((bookObject, i) => {
        const book = bookObject.book.bookCode;
        const checkProjectList = projectBooks.includes(book) ? true : '';
        const checkBookList = bookList.includes(book) ? true : '';
        if (checkProjectList === true) {
          return (
            <Button
              key={i}
              size='small'
              variant='outlined'
              className={classes.bookButton}
            >
              <FormControlLabel
                className={classes.label}
                control={
                  <DisabledCheckbox
                    icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    name={book}
                    checked={checkProjectList}
                    disabled={checkProjectList}
                  />
                }
                label={<span style={{ fontSize: 15 }}>{book}</span>}
              />
            </Button>
          );
        } else {
          return (
            <Button
              key={i}
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
                    checked={checkBookList}
                    onClick={handleChange}
                  />
                }
                label={<span style={{ fontSize: 15 }}>{book}</span>}
              />
            </Button>
          );
        }
      });
    }
  };

  const handleSelectAll = (e) => {
    const checkValue = e.target.checked;
    const Books = [];
    if (checkValue) {
      sourceBooks.forEach((bk) => {
        const currentBook = bk.book.bookCode;
        if (!projectBooks.includes(currentBook)) {
          Books.push(bk.book.bookCode);
        }
      });
    }
    setBookList(Books);
    setSelectAll(e.target.checked);
  };

  const displaySelectAll = () => {
    if (sourceBooks) {
      return (
        <FormControlLabel
          label={<span>Select All</span>}
          labelPlacement='start'
          control={
            <GreenCheckbox
              icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
              checkedIcon={<CheckBoxIcon fontSize='small' />}
              onClick={handleSelectAll}
              checked={selectAll}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
        />
      );
    }
  };

  const handleSelectBooks = () => {
    setOpen(true);
  };

  const dialogClose = () => {
    setOpen(false);
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
      <Dialog
        maxWidth='sm'
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='simple-dialog-title'>
          <Grid container direction='row'>
            <Grid item md={6}>
              <span className={classes.DialogTitle}>SELECT BOOKS</span>
            </Grid>
            <Grid item md={6}>
              <IconButton
                aria-label='close'
                className={classes.closeButton}
                onClick={dialogClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.DialogContent} dividers>
          <Grid container direction='row'>
            <Grid className={classes.displaySelectAll} item md={12}>
              {displaySelectAll()}
            </Grid>
            <Grid className={classes.displayBooks} item md={12}>
              {displayBooks()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.DialogActions}>
          <Button onClick={addBooks} variant='contained' color='primary'>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

SourceBookSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  sourceBooks: PropTypes.array,
  projectBooks: PropTypes.array,
  buttonText: PropTypes.string,
};
