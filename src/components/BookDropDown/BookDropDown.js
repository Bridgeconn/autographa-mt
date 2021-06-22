import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { API } from '../../store/api';

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
  const { value, onChange, width, source } = props;
  const [booksValue, setBooksValue] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [book, setBook] = React.useState([]);
  const [chapter, setChapter] = React.useState(1);

  useEffect(() => {
    if (source !== undefined) {
      API.get(`/bibles/${source.sourceName}/versification`)
        .then((response) => {
          console.log(response.data.maxVerses);
          setBooksValue(response.data.maxVerses);
        })
        .catch((err) => console.log(err));
    }
  }, [source]);

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
  const chapterClicked = (chapter) => {
    setChapter(chapter);
    onChange({ book, chapter });
    setOpen(false);
  };

  const bookName = value.book;
  const chapterNumber = value.chapter;
  useEffect(() => {
    if (bookName) {
      setBook(bookName);
    }
  }, [bookName]);

  useEffect(() => {
    if (chapterNumber) {
      setChapter(chapterNumber);
    }
  }, [chapterNumber]);

  const displayBooks = () => {
    if (Object.keys(booksValue).length > 0) {
      return Object.keys(booksValue).map((bookObject, i) => {
        const book = bookObject;
        return (
          <Grid item xs={2} key={i}>
            <Button
              size='small'
              variant='outlined'
              className={classes.bookButton}
              onClick={() => bookClicked(book)}
            >
              <span style={{ fontSize: 15 }}>{bookObject}</span>
            </Button>
          </Grid>
        );
      });
    } else {
      return (
        <Grid item xs={4}>
          <Typography gutterBottom variant='h10'>
            No Source selected
          </Typography>
        </Grid>
      );
    }
  };

  const displayChapters = () => {
    const chapterNos = booksValue[book];
    if (chapterNos !== undefined) {
      const chapters = [...Array(chapterNos.length).keys()].map((x) => x + 1);
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
    }
  };

  const handleSelectBooks = () => {
    setOpen(true);
    setTabValue(0);
  };

  return (
    <React.Fragment>
      <Button
        variant='contained'
        color='primary'
        onClick={handleSelectBooks}
        style={{ width: width || 100 }}
      >
        {book} {chapter}
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
  width: PropTypes.number,
  source: PropTypes.string,
};
