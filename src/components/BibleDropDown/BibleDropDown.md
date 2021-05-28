```js
import { useState, useEffect } from 'react';
import BibleDropDown from './BibleDropDown';
import SnackBar from '../SnackBar';
import Button from '@material-ui/core/Button';

const [responseStatus, setResponseStatus] = React.useState([]);
const [bookName, setBookName] = useState([]);

const handleClose = () => {
  setResponseStatus([false]);
};

useEffect(() => {
  if (bookName.length !== 0) {
    setResponseStatus([true, 'success', JSON.stringify(bookName)]);
  }
}, [bookName]);

<>
  <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
  <BibleDropDown value={bookName} onChange={setBookName} />
</>;
```
