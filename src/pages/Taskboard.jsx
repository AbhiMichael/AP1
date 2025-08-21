import React, { useState } from 'react';
import { Box } from '@mui/material';

import Sidebar from '../component/Sidebar';
import TaskBoard from '../component/TaskBoard';

const initialTasks = [
  { id: 'task-1', content: 'Task 1: Buy groceries' },
  { id: 'task-2', content: 'Task 2: Complete React assignment' },
  { id: 'task-3', content: 'Task 3: Water the plants' },
  { id: 'task-4', content: 'Task 4: Read a book' },
  { id: 'task-5', content: 'Task 5: Workout for 30 mins' },
  { id: 'task-6', content: 'Task 6: Clean the desk' },
  { id: 'task-7', content: 'Task 7: Respond to emails' },
  { id: 'task-8', content: 'Task 8: Review pull requests' },
  { id: 'task-9', content: 'Task 9: Call the bank' },
  { id: 'task-10', content: 'Task 10: Plan the weekend trip' },
];

const DragDropTasks = () => {
  const [columns, setColumns] = useState({
    card1: {
      name: 'To Do Tasks',
      items: initialTasks.slice(0, 5),
    },
    card2: {
      name: 'Completed Tasks',
      items: initialTasks.slice(5),
    },
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar isSmallScreen={false} />
      <TaskBoard columns={columns} setColumns={setColumns} />
    </Box>
  );
};

export default DragDropTasks;
