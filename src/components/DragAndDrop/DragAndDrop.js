import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    // height: '330px',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 600,
    height: 1000,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    maxHeight: 400,
  },
  panel: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));

function DragPanel(props) {
  const classes = useStyles();
  const { label, status, onClick, name } = props;
  return (
    <>
      {status && (
        <CardContent
          className={classes.root}
          style={{
            padding: '0.5px',
          }}
        >
          <Box display='flex'>
            <Box flexGrow={1}>
              <Typography gutterBottom variant='h6'>
                {label}
              </Typography>
            </Box>
            <Box>
              <IconButton
                aria-label='close'
                className={classes.closeButton}
                onClick={onClick}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          {name}
        </CardContent>
      )}
    </>
  );
}

DragPanel.propTypes = {
  label: PropTypes.string,
  status: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.node,
};

export default function DragAndDrop(props) {
  const classes = useStyles();
  const { componentObject, menuItems } = props;
  const [characters, updateCharacters] = useState(componentObject);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);
    updateCharacters(items);
  };

  return (
    <div>
      <div className={classes.content}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map((item, index) => {
                  const menuItem = menuItems[index];
                  const { id, name, onClick, label, status } = item;
                  console.log(label);
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <>
                          {name && (
                            <div
                              variant='outlined'
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {console.log(item.label)}
                              <DragPanel
                                {...menuItem}
                                name={name}
                                labels={label}
                                statusValue={status}
                                onClicks={onClick}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

DragAndDrop.propTypes = {
  onChange: PropTypes.func.isRequired,
  source: PropTypes.any,
  componentObject: PropTypes.object,
  menuItems: PropTypes.object,
};
