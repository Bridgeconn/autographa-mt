import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CancelIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { API } from '../../store/api';
import { ProjectsContext } from './ProjectContext';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 10,
  },
}));

export default function ProjectListDelete(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setReload, activeProjects } = useContext(ProjectsContext);

  const handleClickOpen = () => {
    if (activeProjects) {
      setOpen(true);
    }
  };

  const handleDelete = (value) => {
    API.put('autographa/projects', {
      projectId: value,
      active: false,
    })
      .then((response) => {
        setOpen(false);
        setReload(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title='Delete'>
        <DeleteOutlinedIcon onClick={handleClickOpen} />
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to deactivate {props.projectName} project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            startIcon={<DeleteOutlinedIcon />}
            onClick={() => {
              handleDelete(props.projectId);
            }}
          >
            Deactivate
          </Button>
          <Button
            variant='contained'
            color='default'
            className={classes.button}
            startIcon={<CancelIcon />}
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ProjectListDelete.propTypes = {
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
};
