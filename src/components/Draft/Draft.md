### Print Draft

This is a demo for Viewing and printing the Project Draft
You can select the full project, a books.
Then view and print the selected portion.

```js
import { useState } from 'react';
import Box from '@material-ui/core/Box';
import ProjectSelect from '../ProjectSelect';
import Draft from './Draft';

const [project, setProject] = useState(null);
const [book, setBook] = useState('');

<>
  <Box>
    <ProjectSelect value={project} onChange={setProject} />
  </Box>
  <Draft project={project} />
</>;
```
