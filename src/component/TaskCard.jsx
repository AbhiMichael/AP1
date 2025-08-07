import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const TaskCard = ({ title, children }) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 3,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            padding: 2,
            minHeight: 300,
            maxHeight: 500,
            overflowY: 'auto',
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
