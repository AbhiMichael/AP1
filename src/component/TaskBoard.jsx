import React from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
} from '@mui/material';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import TaskCard from './TaskCard';
import TaskItem from './TaskItem';

const TaskBoard = ({ columns, setColumns }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    let sourceCardId, destinationCardId;
    let sourceIndex, destinationIndex;

    for (const [cardId, card] of Object.entries(columns)) {
      const index = card.items.findIndex((item) => item.id === active.id);
      if (index !== -1) {
        sourceCardId = cardId;
        sourceIndex = index;
        break;
      }
    }

    for (const [cardId, card] of Object.entries(columns)) {
      const index = card.items.findIndex((item) => item.id === over.id);
      if (index !== -1) {
        destinationCardId = cardId;
        destinationIndex = index;
        break;
      }
    }

    const sourceItems = [...columns[sourceCardId].items];
    const destinationItems =
      sourceCardId === destinationCardId ? sourceItems : [...columns[destinationCardId].items];

    const [movedItem] = sourceItems.splice(sourceIndex, 1);
    destinationItems.splice(destinationIndex, 0, movedItem);

    setColumns({
      ...columns,
      [sourceCardId]: {
        ...columns[sourceCardId],
        items: sourceItems,
      },
      [destinationCardId]: {
        ...columns[destinationCardId],
        items: destinationItems,
      },
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(180deg, #bbe3f1ff ,#fff)`,
        overflowY: 'auto',
        p: 4,
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" mb={5}>
          <Typography variant="h4" fontWeight={700} >
            Task Organizer
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Drag and drop tasks between cards
          </Typography>
        </Box>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Grid container spacing={4} justifyContent="center">
            {Object.entries(columns).map(([columnId, column]) => (
              <Grid item xs={12} md={6} key={columnId}>
                <TaskCard title={column.name}>
                  <SortableContext
                    items={column.items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {column.items.map((item) => (
                      <TaskItem key={item.id} id={item.id} content={item.content} />
                    ))}
                  </SortableContext>
                </TaskCard>
              </Grid>
            ))}
          </Grid>
        </DndContext>
      </Container>
    </Box>
  );
};

export default TaskBoard;
