// component/DeleteConfirmDialog.jsx
import React from 'react';
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, Typography
} from '@mui/material';

const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete this user?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" color="error" onClick={onConfirm}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmDialog;
