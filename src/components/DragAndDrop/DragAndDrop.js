import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
// import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    height: '330px',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: 800,
    width: 600,
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      {value === index && (
        <Box
          p={1}
          flexGrow={1}
          role='tabpanel'
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          {children}
        </Box>
      )}
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function DragAndDrop(props) {
  const classes = useStyles();
  const { componentObject } = props;
  const [value] = React.useState(0);
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
        <TabPanel value={value} index={0} style={{ overflowX: 'auto' }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='characters'>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {characters.map(({ id, name }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <>
                            {name && (
                              <div
                                variant='outlined'
                                className={classes.root}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <CardContent
                                  className={classes.panel}
                                  style={{
                                    padding: '0.5px',
                                  }}
                                >
                                  {name}
                                </CardContent>
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
        </TabPanel>
      </div>
    </div>
  );
}

DragAndDrop.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  source: PropTypes.any,
  componentObject: PropTypes.object,
};
