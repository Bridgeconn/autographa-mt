### Status Bar

```js
import { useState } from 'react';
import StatusBar from './StatusBar';
import ProjectDropDown from '../ProjectDropDown';
import Grid from '@material-ui/core/Grid';

const [progressBar, setProgressBar] = React.useState(0);
const [selectProject, setSelectProject] = React.useState('');

<>
  <Grid container spacing={3}>
    <Grid item xs={6}>
      <ProjectDropDown
        onChange={setSelectProject}
        width={200}
        value={selectProject}
        componentName={'Select Project'}
      />
    </Grid>
    <Grid item xs={4}>
      <StatusBar value={selectProject} />
    </Grid>
  </Grid>
</>;
// progressPer={progressBar}
```
