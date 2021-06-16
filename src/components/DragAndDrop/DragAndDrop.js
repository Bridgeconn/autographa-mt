import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    maxHeight: 400,
  },
}));

const finalSpaceCharacters = [
  { id: 'gary', name: 'Gary Goodspeed' },
  { id: 'cato', name: 'Little Catto' },
  { id: 'kvin', name: 'KVN' },
  { id: 'mooncake', name: 'MoonCake' },
  { id: 'quinn', name: 'Quinn Ergon' },
];

export default function DragAndDrop(props) {
  const classes = useStyles();
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);
    updateCharacters(items);
    // console.log('DRAGDROP', result);
  };

  return (
    <React.Fragment>
      <h1>DRAG AND DROP</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='characters'>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <Card
                        variant='outlined'
                        className={classes.root}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <CardContent>{name}</CardContent>
                      </Card>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
}
