### Project Drop Down

This Select Component will list all the Projects from the database. It uses react-select.

```js
import ProjectDropDown from './ProjectDropDown';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const [sourceCard, setSourceCard] = useState('');
const [selectProject, setSelectProject] = React.useState('');

<>
  <ProjectDropDown
    onChange={setSelectProject}
    width={300}
    value={selectProject}
    componentName={'Select Project'}
  />
  <Button
    variant='contained'
    color='primary'
    onClick={() => setSelectProject(null)}
    style={{ margin: '10px 0' }}
  >
    Clear
  </Button>
  {sourceCard}
</>;
// {console.log(selectProject)}
```
