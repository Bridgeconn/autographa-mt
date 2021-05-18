import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { ProjectsContext } from './ProjectContext';
import ProjectListDelete from './ProjectListDelete';
import ProjectListEdit from './ProjectListEdit';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const columns = [
  {
    name: 'projectName',
    label: 'Project Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'sourceLanguage',
    label: 'Source Language',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'targetLanguage',
    label: 'Target Language',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: '',
    options: {
      filter: false,
      // eslint-disable-next-line react/display-name
      customBodyRender: (value) => {
        return <ProjectListEdit projectName={value} />;
      },
    },
  },
  {
    name: '',
    options: {
      filter: false,
      // eslint-disable-next-line react/display-name
      customBodyRender: (value) => {
        const projectNameValue = value.split('/')[0];
        const projectIdValue = value.split('/')[1];
        return (
          <div>
            <ProjectListDelete
              projectName={projectNameValue}
              projectId={projectIdValue}
            />
          </div>
        );
      },
    },
  },
];

const options = {
  filterType: 'checkbox',
  download: false,
  print: false,
  viewColumns: false,
  selectableRows: 'none',
};

const ProjectListView = () => {
  const { projects, setActiveProjects, activeProjects } =
    useContext(ProjectsContext);
  const projectData = projects.map((project) => {
    return [
      project.projectName,
      project.sourceLanguage.language,
      project.targetLanguage.language,
      project.projectName,
      project.projectName + '/' + project.projectId,
    ];
  });
  return (
    <div>
      <Typography
        component='div'
        style={{
          right: '8rem',
          position: 'absolute',
          bottom: '32.5rem',
          zIndex: 10,
        }}
      >
        <Grid component='label' container alignItems='center' spacing={1}>
          <Grid item>Active</Grid>
          <Grid item>
            <Switch
              checked={activeProjects}
              onChange={() => setActiveProjects(!activeProjects)}
              color='primary'
            />
          </Grid>
        </Grid>
      </Typography>
      <MUIDataTable
        title='PROJECTS'
        data={projectData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default ProjectListView;
