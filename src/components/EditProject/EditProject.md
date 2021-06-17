### Edit Project Page

This component will help to Edit the created Project

```js
import EditProject from './EditProject';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const [projectData, setProjectData] = React.useState();

import { API } from '../../store/api';

const loadText = () => {
  API.get('autographa/projects?project_name=Operation%20Agape')
    .then(function (response) {
      setProjectData(response.data[0]);
    })
    .catch((error) => {
      console.log('error', error);
    });
};

<>
  <Grid container direction='row'>
    <Grid item md={3}>
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={loadText}
      >
        Load Project
      </Button>
    </Grid>

    <Grid item md={2}>
      {projectData && <EditProject projectData={projectData} />}
    </Grid>
  </Grid>
</>;
```
