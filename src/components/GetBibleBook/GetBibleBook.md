### Bible Books

This component will show a group of bible which we can select

```js
import { useState, useEffect } from 'react';
import GetBibleBook from './GetBibleBook';
import Button from '@material-ui/core/Button';

const [bibleBook, setBibleBook] = useState([
  {
    book: {
      bookId: 41,
      bookName: 'matthew',
      bookCode: 'mat',
    },
    active: true,
  },
  {
    book: {
      bookId: 44,
      bookName: 'john',
      bookCode: 'jhn',
    },
    active: true,
  },
  {
    book: {
      bookId: 67,
      bookName: 'revelation',
      bookCode: 'rev',
    },
    active: true,
  },
  {
    book: {
      bookId: 43,
      bookName: 'luke',
      bookCode: 'luk',
    },
    active: true,
  },
]);

<GetBibleBook bookData={bibleBook} />;
```
