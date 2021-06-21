### Edit Project Page

This component will help to Edit the created Project

```js
import EditProject from './EditProject';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const [projectName, setProjectName] = React.useState('Operation Agape');



<>
  <Grid container direction='row'>
    <Grid item md={2}>
      {<EditProject projectName={projectName} />}
    </Grid>
  </Grid>
</>;
```
