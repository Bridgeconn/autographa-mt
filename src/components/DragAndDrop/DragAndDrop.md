### Drag And Drop

Have some issue with this RCL have to rework on it

```js
import Menu from '../Menu';
import DragAndDrop from './DragAndDrop';
import TranslationComponent from './TranslationComponent';
import { useState } from 'react';
import ProjectList from '../ProjectList';

const [translationWordStatus, setTranslationWordStatus] = useState(true);
const [sourceReferenceStatus, setSourceReferenceStatus] = useState(true);
const [open, setOpen] = React.useState(true);
const [project, setProject] = useState([]);

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
    label: 'Project List',
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
  },
  {
    name: (
      <div style={{ maxHeight: 500, overflow: 'auto' }}>
        <ProjectList />
      </div>
    ),
    id: 'kving',
  },
];

<>
  <Menu buttonLabel='View' menuItems={menuItems} />
  <DragAndDrop componentObject={dragDropComponents} menuItems={menuItems} />
</>;
```
