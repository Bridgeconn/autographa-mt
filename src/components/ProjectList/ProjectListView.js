import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { ProjectsContext } from './ProjectContext';
import ProjectListDelete from './ProjectListDelete';
import RefreshIcon from '@material-ui/icons/Refresh';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import EditProject from '../EditProject';

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
      sort: true,
    },
  },
  {
    name: 'targetLanguage',
    label: 'Target Language',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: '',
    options: {
      filter: false,
      sort: false,
      // eslint-disable-next-line react/display-name
      customBodyRender: (value) => {
        return <EditProject projectName={value} />;
      },
    },
  },
  {
    name: '',
    options: {
      filter: false,
      sort: false,
      // eslint-disable-next-line react/display-name
      customBodyRender: (value, row) => {
        return (
          <div>
            <ProjectListDelete projectName={row.rowData[3]} projectId={value} />
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

export default function ProjectListView() {
  const { projects, setActiveProjects, activeProjects, setReload } =
    useContext(ProjectsContext);
  const projectData = projects.map((project) => {
    return [
      project.projectName,
      project.sourceLanguage.language,
      project.targetLanguage.language,
      project.projectName,
      project.projectId,
    ];
  });

  const handleRefresh = () => {
    setReload(true);
  };

  return (
    <div>
      <Grid
        component='label'
        container
        alignItems='center'
        spacing={1}
        style={{
          right: 260,
          top: '1.3rem',
          position: 'relative',
          float: 'right',
          zIndex: 50,
          width: 'auto',
        }}
      >
        <Grid item>
          <Tooltip title='Refresh'>
            <RefreshIcon onClick={handleRefresh} />
          </Tooltip>
        </Grid>
      </Grid>
      <Typography
        component='div'
        style={{
          right: '1%',
          top: '1rem',
          position: 'relative',
          float: 'right',
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
}
