import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { BookContext } from './BookContext';
import { bibleChapters } from '../../store/bibleData';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function BibleBooks() {
  const classes = useStyles();
  const [book, setBook] = React.useState('');
  const [chapter, setChapter] = React.useState('');
  const [chapterList, setChapterList] = React.useState([]);

  const { books } = useContext(BookContext);

  const bookChanged = (event) => {
    setBook(event.target.value);
    const bookId = event.currentTarget.getAttribute('data-bookid');
    const chapters = bibleChapters[bookId];
    setChapterList(new Array(chapters).fill(0).map((_, i) => i + 1));
  };
  const chapterChanged = (event) => {
    setChapter(event.target.value);
  };

  return (
    <React.Fragment>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='book-label'>Book</InputLabel>
        <Select
          labelId='book-label'
          id='demo-simple-select-outlined'
          value={book}
          onChange={bookChanged}
          label='Book'
        >
          {books && books.length > 0
            ? books.map((book, i) => (
                <MenuItem value={book.short} key={i} data-bookid={book.book_id}>
                  {book.short}
                </MenuItem>
              ))
            : ''}
        </Select>
      </FormControl>
      {chapterList.length !== 0 ? (
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='chapter-label'>Chapter</InputLabel>
          <Select
            labelId='chapter-label'
            value={chapter}
            onChange={chapterChanged}
            label='Chapter'
          >
            {chapterList.map((chapterItem) => (
              <MenuItem value={chapterItem} key={chapterItem}>
                {chapterItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        ''
      )}
    </React.Fragment>
  );
}
