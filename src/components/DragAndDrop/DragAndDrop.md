### Drag And Drop

Have some issue with this RCL have to rework on it

```js
import Menu from '../Menu';
import SourcePanelComponent from './SourcePanelComponent';
import DragAndDrop from './DragAndDrop';
import TranslationComponent from './TranslationComponent';
import { useState } from 'react';

const [translationWordStatus, setTranslationWordStatus] = useState(true);
const [sourceReferenceStatus, setSourceReferenceStatus] = useState(true);
const [open, setOpen] = React.useState(true);

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

const dragDropComponents = [
  {
    name: (
      <TranslationComponent translationWordStatus={translationWordStatus} />
    ),
    id: 'kvin',
    label: 'Translation Word',
  },
  {
    name: (
      <SourcePanelComponent sourceReferenceStatus={sourceReferenceStatus} />
    ),
    id: 'kving',
    label: 'Source Reference',
  },
];

<>
  <Menu buttonLabel='View' menuItems={menuItems} />
  <DragAndDrop componentObject={dragDropComponents} menuItems={menuItems} />
</>;
```
