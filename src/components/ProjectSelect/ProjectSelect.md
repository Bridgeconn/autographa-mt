### Project Select

This is a demo for the Project Select, which is a dropdown which shows the list of availalbe projects.

```js
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ProjectSelect from './ProjectSelect';

const [project, setProject] = useState(null);
const [projectCard, setProjectCard] = useState('');

useEffect(() => {
  setProjectCard(
    project != null ? (
      <Card style={{ width: 400, marginTop: 20 }}>
        <CardContent>
          <Typography variant='h5' component='h5' gutterBottom>
            {project.projectName}
          </Typography>
          <Typography>Project Id: {project.projectId}</Typography>
          <Typography>
            Source Language : {project.sourceLanguage.language}
          </Typography>
          <Typography>
            Target Language : {project.targetLanguage.language}
          </Typography>
          <Typography>Document Format:{project.documentFormat}</Typography>
        </CardContent>
      </Card>
    ) : (
      ''
    )
  );
}, [project, setProjectCard]);

<>
  <ProjectSelect value={project} onChange={setProject} />
  {projectCard}
</>;
```
