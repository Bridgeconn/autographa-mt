### Sample Menu

```js
import { useState, useEffect } from 'react';
const [translationWordStatus, setTranslationWordStatus] = useState(true);
const [sourceReferenceStatus, setSourceReferenceStatus] = useState(false);

const translationWordClick = () => {
	setTranslationWordStatus(!translationWordStatus);
};

const sourceReferenceClick = () => {
	setSourceReferenceStatus(!sourceReferenceStatus);
};

const menuItems =[
  {
    label:"Translation Word",
    onClick: translationWordClick,
    status: translationWordStatus
  },
  {
    label:"Source Reference",
    onClick: sourceReferenceClick,
    status: sourceReferenceStatus
  },]


import Menu from './Menu';
<Menu buttonLabel="View" menuItems={menuItems} />;
```