import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: '90%',
    height: '70%',
  },
  container: {
    maxHeight: 165,
    scrollbarWidth: 'none',
  },
  tableHead: {
    padding: 0.5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  tableBody: {
    padding: 0.5,
    color: 'gray',
    paddingLeft: '5px',
  },

  '@global': {
    '*::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const bookAssigned = props.projectData.metaData.books;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                Books Assigned
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookAssigned.map((row) => {
              const index = bookAssigned.indexOf(row);
              return (
                <TableRow key={index}>
                  <TableCell className={classes.tableBody} key={index}>
                    {row}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
StickyHeadTable.propTypes = {
  projectData: PropTypes.object,
};
