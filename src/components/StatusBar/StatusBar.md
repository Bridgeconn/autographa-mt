### Status Bar

Demo Status Bar for Project, Select a project to see its status

```js
import { useState } from 'react';
import StatusBar from './StatusBar';
import ProjectDropDown from '../ProjectDropDown';
import Grid from '@material-ui/core/Grid';

const [selectProject, setSelectProject] = React.useState(null);

<>
  <Grid container spacing={3}>
    <Grid item xs={6}>
      <ProjectDropDown
        onChange={setSelectProject}
        value={selectProject}
        componentName={'Select Project'}
      />
    </Grid>
    <Grid item xs={6} style={{ marginTop: 12 }}>
      <StatusBar value={selectProject} />
    </Grid>
  </Grid>
</>;
```
