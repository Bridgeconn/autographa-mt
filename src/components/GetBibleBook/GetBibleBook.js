import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function GetBibleBook(props) {
  const bibleData = props.bookData;

  const [state, setState] = React.useState({
    // checkedA: true,
    // checkedB: true,
    // checkedF: true,
    // checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <FormGroup row>
      {bibleData?.map((data) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name='checkedA'
                size='small'
              />
            }
            label={data.book.bookCode}
          />
        );
      })}
    </FormGroup>
  );
}
