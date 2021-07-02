### Menu

Demo Menu to show and hide screen elements

```js
import { useState, useEffect } from 'react';
import Menu from './Menu';
import Box from '@material-ui/core/Box';

const [translationWordStatus, setTranslationWordStatus] = useState(true);
const [sourceReferenceStatus, setSourceReferenceStatus] = useState(false);

const translationWordClick = () => {
  setTranslationWordStatus(!translationWordStatus);
};

const sourceReferenceClick = () => {
  setSourceReferenceStatus(!sourceReferenceStatus);
};

const menuItems = [
  {
    label: 'Translation Word',
    onClick: translationWordClick,
    status: translationWordStatus,
  },
  {
    label: 'Source Reference',
    onClick: sourceReferenceClick,
    status: sourceReferenceStatus,
  },
];

<>
  <Menu buttonLabel='View' menuItems={menuItems} />
  {translationWordStatus && (
    <Box border={1} p={2} m={1}>
      Demo Translation Word Panel
    </Box>
  )}
  {sourceReferenceStatus && (
    <Box border={1} p={2} m={1}>
      Demo Source Reference Panel
    </Box>
  )}
</>;
```
