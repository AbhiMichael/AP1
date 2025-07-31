import React, { useState } from 'react';
import {
  Box, Button, TextField, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, Typography, Radio, RadioGroup,
  FormControlLabel, FormLabel, useMediaQuery, useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Sidebar from '../component/Sidebar';

const educationOptions = ['High School', 'Diploma', 'Graduate', 'Post Graduate'];

const validationSchema = Yup.object({
  name: Yup.string().matches(/^[A-Za-z ]+$/, 'Only letters allowed').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  education: Yup.string().required('Required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Must be 10 digits').required('Required'),
  dob: Yup.date().required('Required'),
  gender: Yup.string().required('Required'),
});

export default function FormikMUIForm() {
  const [open, setOpen] = useState(false);
  const [formPreview, setFormPreview] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      education: '',
      phone: '',
      dob: null,
      gender: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setFormPreview(values);
      setOpen(true);
    },
  });
  
  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100vw', 
      flexDirection: 'row',
    }}>
      {/* Sidebar Component - Hidden on mobile, drawer-style could be implemented */}
      <Box sx={{
        width: { xs: '100%', sm: '40px' },
        
        display: { xs: isMobile ? 'none' : 'block', sm: 'block' },
      }}>
        <Sidebar />
      </Box>
      
      {/* Main Content Area */}
      <Box sx={{ 
        flexGrow: 1, 
        p: { xs: 1, sm: 1 },
        overflow: 'auto'
      }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: '', sm: '95vh' },
              p: { xs: 1, sm: 2 },
              my: { xs: 2, sm: 0 }
            }} 
          >
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '600px' },
                p: { xs: 2, sm: 4 },
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: { xs: 0, sm: 3 }
              }}
            >
              <Typography variant="h6" gutterBottom align="center">Registration Form</Typography>

              <TextField
                fullWidth 
                label="Name" 
                name="name" 
                margin="normal"
                size={isMobile ? 'small' : 'medium'}
                value={formik.values.name} 
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth 
                label="Email" 
                name="email" 
                margin="normal"
                size={isMobile ? 'small' : 'medium'}
                value={formik.values.email} 
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth 
                label="Address" 
                name="address" 
                margin="normal" 
                multiline
                rows={isMobile ? 2 : 4}
                size={isMobile ? 'small' : 'medium'}
                value={formik.values.address} 
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />

              <TextField
                fullWidth 
                select 
                label="Education" 
                name="education" 
                margin="normal"
                size={isMobile ? 'small' : 'medium'}
                value={formik.values.education} 
                onChange={formik.handleChange}
                error={formik.touched.education && Boolean(formik.errors.education)}
                helperText={formik.touched.education && formik.errors.education}
              >
                {educationOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth 
                label="Phone Number" 
                name="phone" 
                margin="normal"
                size={isMobile ? 'small' : 'medium'}
                value={formik.values.phone} 
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <DatePicker
                label="Date of Birth"
                value={formik.values.dob}
                onChange={(value) => formik.setFieldValue('dob', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    size: isMobile ? 'small' : 'medium',
                    error: formik.touched.dob && Boolean(formik.errors.dob),
                    helperText: formik.touched.dob && formik.errors.dob,
                  },
                }}
              />

              <FormLabel component="legend" sx={{ mt: 2 }}>Gender</FormLabel>
              <RadioGroup
                row={!isMobile}
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                sx={{ flexWrap: isMobile ? 'wrap' : 'nowrap' }}
              >
                <FormControlLabel 
                  value="male" 
                  control={<Radio size={isMobile ? 'small' : 'medium'} />} 
                  label="Male" 
                />
                <FormControlLabel 
                  value="female" 
                  control={<Radio size={isMobile ? 'small' : 'medium'} />} 
                  label="Female" 
                />
                <FormControlLabel 
                  value="other" 
                  control={<Radio size={isMobile ? 'small' : 'medium'} />} 
                  label="Other" 
                />
              </RadioGroup>
              {formik.touched.gender && formik.errors.gender && (
                <Typography variant="caption" color="error">{formik.errors.gender}</Typography>
              )}

              <Button
                type="submit"
                fullWidth 
                variant="contained"
                size={isMobile ? 'medium' : 'large'}
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </Box>
          </Box>

          {/* Preview Dialog - Responsive full-screen on mobile */}
          <Dialog 
            open={open} 
            onClose={() => setOpen(false)}
            fullScreen={isMobile}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Form Preview</DialogTitle>
            <DialogContent dividers>
              {formPreview && (
                <Box>
                  <Typography><strong>Name:</strong> {formPreview.name}</Typography>
                  <Typography><strong>Email:</strong> {formPreview.email}</Typography>
                  <Typography><strong>Address:</strong> {formPreview.address}</Typography>
                  <Typography><strong>Education:</strong> {formPreview.education}</Typography>
                  <Typography><strong>Phone:</strong> {formPreview.phone}</Typography>
                  <Typography><strong>DOB:</strong> {new Date(formPreview.dob).toLocaleDateString()}</Typography>
                  <Typography><strong>Gender:</strong> {formPreview.gender}</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </LocalizationProvider>
      </Box>
    </Box>
  );
}