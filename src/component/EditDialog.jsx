import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const EditDialog = ({ open, onClose, onEdit, user }) => {
  const [formData, setFormData] = React.useState({ ...user });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData({ ...user });
    setErrors({});
  }, [user]);

  const validate = () => {
    const tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(formData.name)) tempErrors.name = "Only alphabets allowed";

    if (!formData.designation.trim()) tempErrors.designation = "Designation is required";
    else if (!/^[A-Za-z ]+$/.test(formData.designation)) tempErrors.designation = "Only alphabets allowed";

    if (!formData.role.trim()) tempErrors.role = "Role is required";
    else if (!/^[A-Za-z ]+$/.test(formData.role)) tempErrors.role = "Only alphabets allowed";

    if (!formData.department.trim()) tempErrors.department = "Department is required";
    else if (!/^[A-Za-z ]+$/.test(formData.department)) tempErrors.department = "Only alphabets allowed";

    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Enter a valid 10-digit phone number";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = () => {
    if (validate()) {
      onEdit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth margin="dense" label="Name" name="name"
          value={formData.name || ''} onChange={handleChange}
          error={!!errors.name} helperText={errors.name}
        />
        <TextField
          fullWidth margin="dense" label="Designation" name="designation"
          value={formData.designation || ''} onChange={handleChange}
          error={!!errors.designation} helperText={errors.designation}
        />
        <TextField
          fullWidth margin="dense" label="Role" name="role"
          value={formData.role || ''} onChange={handleChange}
          error={!!errors.role} helperText={errors.role}
        />
        <TextField
          fullWidth margin="dense" label="Department" name="department"
          value={formData.department || ''} onChange={handleChange}
          error={!!errors.department} helperText={errors.department}
        />
        <TextField
          fullWidth margin="dense" label="Phone" name="phone"
          value={formData.phone || ''} onChange={handleChange}
          error={!!errors.phone} helperText={errors.phone}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
