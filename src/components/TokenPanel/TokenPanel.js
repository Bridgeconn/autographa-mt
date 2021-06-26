import React from 'react';
import PropTypes from 'prop-types';

export default function TokenPanel(props) {
  // const { project, book, setToken } = props;
  // get the project tokens for the selected book in useeffect
  // Show a MUI datatable if data available
  // If no data available show no data available in table
  // show 2 cols and in first col show the token and in the 2nd col show the edit token component
  // on selecting a token trigger the on select function to set the token data
  // trigger next/prev counter also to a prop function
  return <div>TokenPanel</div>;
}
TokenPanel.propTypes = {
  setToken: PropTypes.func.isRequired,
  book: PropTypes.string.isRequired,
  project: PropTypes.object,
};
