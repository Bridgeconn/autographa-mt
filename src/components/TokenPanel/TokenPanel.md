### Token Panel

This is a demo for the TokenPanel compoenent which shows the list of tokens that are present in the selected book
this demo has a project selector and a book selector, so select a active project and a book present in the project to show the availlabe tokens in the token panel
Note to testers:
Sending a PR mid way making the feature, have added the supporting compoenents next have to build the token panel itself
as many files are changed. So the main token panel is not functional below and is just a text, Will send a PR in another day or so with the token panel

```js
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ProjectSelect from '../ProjectSelect';
import ProjectBookSelect from '../ProjectBookSelect';
import TokenPanel from './TokenPanel';

const [project, setProject] = useState(null);
const [book, setBook] = useState('');
const [token, setToken] = useState('');
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
  <TokenPanel project={project} book={book} setToken={setToken} />
</Box>;
```
