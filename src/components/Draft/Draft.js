import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { Box, Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import { API } from '../../store/api';
import ProjectBookSelect from '../ProjectBookSelect';

export default function Draft({ project }) {
  // Show a drop down with 3 option,
  // Full Project, Few Books, Few Chapters,
  // Full Project- hide 2nd drop down
  // FewBooks - show a dropdown with the list of project Books
  // Few Chapters - show a dorpdown with the books and on clicking it show its chapters
  // Get Draft- fetch the selected draft portion and show in draft div
  // print button - print the draft div
  const [option, setOption] = useState(0);
  const [book, setBook] = useState('');
  const [draft, setDraft] = useState([]);
  const draftRef = useRef();
  useEffect(() => {
    if (project === null) {
      setBook('');
    }
  }, [project]);
  const getDraft = () => {
    const bookParam = option === 2 ? `&books=${book}` : '';
    API.get(
      `autographa/project/draft?project_id=${project.projectId}${bookParam}&output_format=print-json`
    ).then(function (response) {
      formatDraft(response.data);
    });
  };
  const formatDraft = (data) => {
    const arr = [];
    for (const verse in data) {
      const cv = verse.split(' ')[1];
      arr.push({
        b: verse.split(' ')[0],
        c: cv.split(':')[0],
        v: cv.split(':')[1],
        text: data[verse],
      });
    }
    const reduceBook = (acc, x) => {
      if (!acc[x.b]) {
        acc[x.b] = [];
      }
      acc[x.b].push(x);
      return acc;
    };
    const reduceChapter = (acc, x) => {
      if (!acc[x.c]) {
        acc[x.c] = [];
      }
      acc[x.c].push(x);
      return acc;
    };
    const b = arr.reduce(reduceBook, {});
    const books = {};
    for (const book in b) {
      books[book] = b[book].reduce(reduceChapter, {});
    }
    setDraft(books);
  };
  const options = [
    { label: 'Full Project', value: 1 },
    { label: 'A Book', value: 2 },
    // { label: 'Few Chapters', value: 3 },
  ];
  const showChapter = (chapter) => {
    return chapter.map((verse, k) => (
      <div key={k}>{`${verse.v} ${verse.text}`}</div>
    ));
  };
  const showBook = (book) => {
    return (
      <div>
        {Object.keys(book).map((chapter, k) => {
          return (
            <div key={k}>
              <div style={{ fontSize: 20 }}>{chapter}</div>
              <div>{showChapter(book[chapter])}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const showDraft = () => {
    return Object.keys(draft).map((book, k) => {
      return (
        <div key={k}>
          <div style={{ fontSize: 25 }}>{book}</div>
          <div>{showBook(draft[book])}</div>
        </div>
      );
    });
  };
  return (
    <>
      <Box display='flex'>
        <Box p={1} pl={0} style={{ width: 200 }}>
          <ReactSelect
            placeholder={'Select Option'}
            onChange={(option) => setOption(option.value)}
            options={options}
          />
        </Box>
        <Box p={1}>
          {option > 1 && (
            <ProjectBookSelect
              project={project}
              onChange={setBook}
              value={book}
              buttonText='Select Book'
            />
          )}
        </Box>
      </Box>
      <Box display='flex'>
        <Box pr={1} pb={1}>
          <Button variant='contained' color='primary' onClick={getDraft}>
            {' '}
            View Draft
          </Button>
        </Box>
        <Box px={1}>
          <ReactToPrint
            trigger={() => (
              <Button variant='contained' color='primary'>
                Print Draft
              </Button>
            )}
            content={() => draftRef.current}
          />
        </Box>
      </Box>
      <div style={{ maxHeight: 400, overflow: 'auto' }}>
        <div style={{ margin: 25 }} ref={draftRef}>
          {showDraft()}
        </div>
      </div>
    </>
  );
}
Draft.propTypes = {
  project: PropTypes.object,
};
