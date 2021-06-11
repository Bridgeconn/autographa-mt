### Context API example

```js
import { useState } from 'react';
import BookDropDown from './BookDropDown';
import Button from '@material-ui/core/Button';

const [bookChapter, setBookChapter] = useState({ book: 'gen', chapter: 1 });
<>
  <BookDropDown
    value={bookChapter}
    onChange={setBookChapter}
    buttonText='BOOKS SELECTOR'
  />
  <Button
    style={{ marginLeft: 20 }}
    variant='contained'
    color='primary'
    onClick={() => setBookChapter({ book: 'psa', chapter: 19 })}
  >
    Set
  </Button>
</>;
```
