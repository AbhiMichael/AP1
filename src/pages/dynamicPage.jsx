import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Modal, 
  Paper,
  TextField,
  Divider
} from "@mui/material";
import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import Sidebar from "../component/Sidebar";
import * as Yup from "yup";
import { Phone, Person, Cake, Delete, People } from "@mui/icons-material";

// Form validation schema
const formSchema = Yup.object().shape({
  people: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be at least 10 digits")
        .max(15, "Must be 15 digits or less")
    })
  )
});

const DynamicFormPage = () => {
  const [openPreview, setOpenPreview] = useState(false);

  const initialValues = {
    people: [{ name: "", age: "", phone: "" }]
  };

  const handleSubmit = (values) => {
    setOpenPreview(true);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' ,width:"100vw",background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',}}>
      <Sidebar isSmallScreen={false} />
      
      <Container maxWidth="lg" sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" component="h1" color="primary" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          User Forms
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <FieldArray name="people">
                {({ push, remove }) => (
                  <>
                    {values.people.map((form, index) => (
                      <Paper 
                        key={index} 
                        elevation={3} 
                        sx={{ 
                          p: 4, 
                          mb: 4, 
                          borderRadius: 2,
                          borderLeft: '4px solid',
                          borderColor: 'primary.main'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                            <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Form {index + 1}
                          </Typography>
                          {index >= 0 && (
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<Delete />}
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </Box>
                        
                        <Divider sx={{ mb: 3 }} />
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'repeat(3, 1fr)' }, gap: 3 }}>
                          {/* Name Field */}
                          <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            id={`people.${index}.name`}
                            name={`people.${index}.name`}
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.people?.[index]?.name && touched.people?.[index]?.name)}
                            helperText={errors.people?.[index]?.name && touched.people?.[index]?.name ? errors.people[index].name : ' '}
                            InputProps={{
                              startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
                            }}
                          />
                          
                          {/* Age Field */}
                          <TextField
                            fullWidth
                            label="Age"
                            variant="outlined"
                            type="number"
                            id={`people.${index}.age`}
                            name={`people.${index}.age`}
                            value={form.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.people?.[index]?.age && touched.people?.[index]?.age)}
                            helperText={errors.people?.[index]?.age && touched.people?.[index]?.age ? errors.people[index].age : ' '}
                            InputProps={{
                              startAdornment: <Cake sx={{ color: 'action.active', mr: 1 }} />,
                              inputProps: { min: 0 }
                            }}
                          />
                          
                          {/* Phone Field */}
                          <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            id={`people.${index}.phone`}
                            name={`people.${index}.phone`}
                            value={form.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.people?.[index]?.phone && touched.people?.[index]?.phone)}
                            helperText={errors.people?.[index]?.phone && touched.people?.[index]?.phone ? errors.people[index].phone : ' '}
                            InputProps={{
                              startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />,
                              inputProps: { maxLength: 15 }
                            }}
                          />
                        </Box>
                      </Paper>
                    ))}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => push({ name: "", age: "", phone: "" })}
                        sx={{ px: 4 }}
                      >
                        Add Another Form
                      </Button>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="success"
                        size="large"
                        disabled={values.people.length === 0}
                        sx={{ px: 4 }}
                      >
                        Submit All Forms
                      </Button>
                    </Box>
                  </>
                )}
              </FieldArray>
              
              {/* Preview Modal */}
              <Modal
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                aria-labelledby="preview-modal-title"
              >
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '80%', md: '60%' },
                    maxHeight: '80vh',
                    p: 4,
                    overflow: 'auto',
                    outline: 'none'
                  }}
                >
                  <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
                    Form Submission Preview
                  </Typography>
                  
                  {values.people.map((form, index) => (
                    <Paper 
                      key={index} 
                      elevation={2} 
                      sx={{ 
                        mb: 3, 
                        p: 3, 
                        borderRadius: 2,
                        borderLeft: '4px solid',
                        borderColor: 'secondary.main'
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Form {index + 1}
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'repeat(2, 1fr)' }, gap: 2 }}>
                        <Typography>
                          <strong>Name:</strong> {form.name || 'Not provided'}
                        </Typography>
                        <Typography>
                          <strong>Age:</strong> {form.age || 'Not provided'}
                        </Typography>
                        <Typography>
                          <strong>Phone:</strong> {form.phone || 'Not provided'}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button 
                      variant="contained" 
                      onClick={() => setOpenPreview(false)}
                      sx={{ px: 4 }}
                    >
                      Close Preview
                    </Button>
                  </Box>
                </Paper>
              </Modal>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default DynamicFormPage;