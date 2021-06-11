import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { bibleBooks, bibleChapters } from '../../store/bibleData';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const useStyles = makeStyles((theme) => ({
  bookButton: {
    padding: '0 8px',
    width: 71,
  },
  bookCard: {
    minWidth: 600,
  },
  chapterButton: {
    padding: 0,
    width: 36,
    minWidth: 'unset',
  },
}));

export default function BookDropDown(props) {
  const classes = useStyles();
  const { value, onChange, buttonText } = props;
  const [open, setOpen] = React.useState(false);
  const [book, setBook] = React.useState(bibleBooks[0].abbreviation);
  const [chapter, setChapter] = React.useState(1);

  const closeBookListing = () => {
    onChange({ book, chapter });
    setOpen(false);
  };
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const bookClicked = (book) => {
    setBook(book);
    setTabValue(1);
  };
  const chapterClicked = (c) => {
    setChapter(c);
    onChange({ book, c });
    setOpen(false);
  };

  const bookP = value.book;
  // console.log(value);
  const chapterP = value.chapter;
  useEffect(() => {
    if (bookP) {
      setBook(bookP);
    }
  }, [bookP]);
  useEffect(() => {
    if (chapterP) {
      setChapter(chapterP);
    }
  }, [chapterP]);

  const displayBooks = () => {
    return bibleBooks.map((bookObject, i) => {
      const book = bookObject.abbreviation;
      return (
        <Grid item xs={2} key={i}>
          <Button
            size='small'
            variant='outlined'
            className={classes.bookButton}
            onClick={() => bookClicked(book)}
          >
            <span style={{ fontSize: 15 }}>{bookObject.abbreviation}</span>
          </Button>
        </Grid>
      );
    });
  };
  const displayChapters = () => {
    const chapterNos = bibleChapters[book];
    const chapters = [...Array(chapterNos).keys()].map((x) => x + 1);
    return chapters.map((chapter, i) => {
      return (
        <Grid item xs={1} key={i}>
          <Button
            size='small'
            variant='outlined'
            className={classes.chapterButton}
            onClick={() => chapterClicked(chapter)}
          >
            <span style={{ fontSize: 15 }}>{chapter}</span>
          </Button>
        </Grid>
      );
    });
  };
  const handleSelectBooks = () => {
    setOpen(true);
    setTabValue(0);
  };

  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={handleSelectBooks}>
        {book} {chapter}
        {/* {buttonText || 'BOOKS'} */}
      </Button>
      <Dialog open={open}>
        <DialogContent className={classes.bookCard}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label='Book' />
            <Tab label='Chapter' />
            <Tab label={`${book} ${chapter}`} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Grid container item spacing={1}>
              {displayBooks()}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid container item spacing={1}>
              {displayChapters()}
            </Grid>
          </TabPanel>
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

BookDropDown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  buttonText: PropTypes.string,
};

// {buttonText === 'SELECT BOOKS' ? (
//   <div>First Title</div>
// ) : (
//   [
//     this.state.someTestValue ? (
//       <div>Second Title</div>
//     ) : (
//       [
//         this.state.thirdValueTest ? (
//           <div>Some Third Title</div>
//         ) : (
//           <div>Last Title</div>
//         ),
//       ]
//     ),
//   ]
// )}
