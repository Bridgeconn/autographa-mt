### Project Book Select

This is a demo for the Project book selector, which selects a book from the selected project.
Select a project from the project dropdown first and then select a book from the Project Book Select

```js
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ProjectSelect from '../ProjectSelect';
import ProjectBookSelect from './ProjectBookSelect';

const [project, setProject] = useState(null);
const [book, setBook] = useState('');

<Box>
  <Box display='flex'>
    <ProjectSelect value={project} onChange={setProject} />
    <ProjectBookSelect
      project={project}
      onChange={setBook}
      buttonText='Project Book Selector'
    />
  </Box>
  <Button>{book || 'No book Selected'}</Button>
  <Button
    variant='contained'
    color='primary'
    onClick={() => setBook(null)}
    style={{ margin: '10px' }}
  >
    Clear
  </Button>
</Box>;
```
