```js
import { useState } from 'react';
import BibleDropDown from './BibleDropDown';

const [bookName, setBookName] = useState([]);
<BibleDropDown value={bookName} onChange={setBookName} />;
```
