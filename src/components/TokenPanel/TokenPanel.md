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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const [project, setProject] = useState(null);
const [book, setBook] = useState('');
const [token, setToken] = useState('');
//Need to link occurance from TokenTranslationUpdate to occurancePanel
const setOccurance = (value) => console.log(value);
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
  <TokenPanel
    project={project}
    book={book}
    setToken={setToken}
    setOccurance={setOccurance}
  />
  <Card style={{ width: '100%', marginTop: 20 }}>
    <CardContent>
      <Typography variant='h5' component='h5' gutterBottom>
        Token: {token[0] || ''}
      </Typography>
      <TextField
        style={{ width: '100%' }}
        placeholder='Token Data'
        multiline
        disabled
        value={JSON.stringify(token[1], undefined, 4)}
        variant='outlined'
      />
    </CardContent>
  </Card>
</Box>;
```
