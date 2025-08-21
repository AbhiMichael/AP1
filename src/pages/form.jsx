import React, { useState } from 'react';
import {
  Box, Button, TextField, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, Typography, Radio, RadioGroup,
  FormControlLabel, FormLabel, useMediaQuery, useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
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
  files: Yup.mixed().test('required', 'At least one file is required', (value) => {
    return value && value.length > 0;
  }).test('fileSize', 'Each file must be less than 2MB', (value) => {
    if (!value) return true;
    return Array.from(value).every(file => file.size <= 2 * 1024 * 1024);
  }).test('fileType', 'Only PDF, JPG, PNG allowed', (value) => {
    if (!value) return true;
    return Array.from(value).every(file =>
      ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)
    );
  }),
});

export default function FormikMUIForm() {
  const [open, setOpen] = useState(false);
   const backgroundPattern = `
      radial-gradient(circle at 20px 20px, rgba(1, 21, 38, 0.15) 2px, transparent 2px),
      radial-gradient(circle at 60px 60px, rgba(3, 22, 42, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 100px 40px, rgba(3, 26, 45, 0.1) 1.5px, transparent 1.5px),
      radial-gradient(circle at 150px 80px, rgba(3, 24, 45, 0.15) 2px, transparent 2px)
    `;
  const [formPreview, setFormPreview] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      education: '',
      phone: '',
      dob: null,
      gender: '',
      files: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('address', values.address);
        formData.append('education', values.education);
        formData.append('phone', values.phone);
        formData.append('dob', values.dob);
        formData.append('gender', values.gender);
        for (let file of values.files) {
          formData.append('files', file);
        }

        const response = await axios.post('http://localhost:3000/api/v1/fileupload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload success:', response.data);

        setFormPreview({
          ...values,
          files: values.files.map(f => f.name),
        });
        setOpen(true);
        resetForm();
        setFileNames([]);
        setFilePreviews([]);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    if (files.length > 0) {
      setFileNames(files.map(f => f.name));
      formik.setFieldValue('files', files);

      const previews = [];
      files.forEach((file) => {
        if (file.type.includes('image') || file.type === 'application/pdf') {
          const reader = new FileReader();
          reader.onload = (e) => {
            previews.push({ type: file.type, url: e.target.result, name: file.name });
            if (previews.length === files.length) {
              setFilePreviews(previews);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  return (
    <Box sx={{ display: "flex",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#d5eef8ff",
          backgroundImage: backgroundPattern,
          backgroundSize: "120px 120px",
          overflow: "hidden",
          position: "relative", }}>
      <Box sx={{
        width: { xs: '100%', sm: '40px' },
        display: { xs: isMobile ? 'none' : 'block', sm: 'block' },
      }}>
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 1 }, overflow: 'auto' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: '', sm: '95vh' },
            p: { xs: 1, sm: 2 },
            my: { xs: 2, sm: 0 }
            
          }}>
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
              <Box
  sx={{ display: 'flex', justifyContent: 'center',alignItems: 'center', mb: 3 }}
>
  <Typography variant="h4" fontWeight="bold" color="primary">
    Registration Form
  </Typography>
</Box>


              <TextField fullWidth label="Name" name="name" margin="normal"
                size={isMobile ? 'small' : 'medium'} value={formik.values.name}
                onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name} />

              <TextField fullWidth label="Email" name="email" margin="normal"
                size={isMobile ? 'small' : 'medium'} value={formik.values.email}
                onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email} />

              <TextField fullWidth label="Address" name="address" margin="normal" multiline
                rows={isMobile ? 2 : 4} size={isMobile ? 'small' : 'medium'} value={formik.values.address}
                onChange={formik.handleChange} error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address} />

              <TextField fullWidth select label="Education" name="education" margin="normal"
                size={isMobile ? 'small' : 'medium'} value={formik.values.education}
                onChange={formik.handleChange} error={formik.touched.education && Boolean(formik.errors.education)}
                helperText={formik.touched.education && formik.errors.education}>
                {educationOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>

              <TextField fullWidth label="Phone Number" name="phone" margin="normal"
                size={isMobile ? 'small' : 'medium'} value={formik.values.phone}
                onChange={formik.handleChange} error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone} />

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
                <FormControlLabel value="male" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="Male" />
                <FormControlLabel value="female" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="Female" />
                <FormControlLabel value="other" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="Other" />
              </RadioGroup>
              {formik.touched.gender && formik.errors.gender && (
                <Typography variant="caption" color="error">{formik.errors.gender}</Typography>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  size={isMobile ? 'small' : 'medium'}
                >
                  Upload Files (PDF, JPG, PNG - max 2MB each)
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileChange}
                  />
                </Button>
                {fileNames.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {fileNames.join(', ')}
                  </Typography>
                )}
                {formik.touched.files && formik.errors.files && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {formik.errors.files}
                  </Typography>
                )}
              </Box>

              {filePreviews.length > 0 && filePreviews.map((preview, index) => (
                <Box key={index} sx={{
                  mt: 2,
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <Typography variant="subtitle2" gutterBottom>{preview.name}</Typography>
                  {preview.type.includes('image') ? (
                    <Box sx={{
                      width: '100%',
                      height: '200px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }}>
                      <img src={preview.url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="File Preview" />
                    </Box>
                  ) : (
                    <Box sx={{ width: '100%', height: '200px', overflow: 'auto', bgcolor: '#f5f5f5' }}>
                      <iframe src={preview.url} style={{ width: '100%', height: '100%', border: 'none' }} title="File Preview" />
                    </Box>
                  )}
                </Box>
              ))}

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

          <Dialog open={open} onClose={() => setOpen(false)} fullScreen={isMobile} maxWidth="sm" fullWidth>
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
                  <Typography><strong>Files:</strong> {formPreview.files.join(', ')}</Typography>
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
