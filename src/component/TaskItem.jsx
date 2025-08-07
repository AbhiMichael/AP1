import React from 'react';
import { Paper } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ id, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    marginBottom: '10px',
  };

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      elevation={isDragging ? 6 : 2}
      sx={{
        p: 2,
        backgroundColor: isDragging ? '#bbdefb' : '#fff',
        ...style,
      }}
    >
      {content}
    </Paper>
  );
};

export default TaskItem;
