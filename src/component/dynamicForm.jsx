import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const DynamicForm = ({ id, setGenId, onDataChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });

  const handleChange = (field) => (event) => {
    const newData = {
      ...formData,
      [field]: event.target.value
    };
    setFormData(newData);
    onDataChange(id, newData); 
  };

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <TextField 
        label="Name" 
        value={formData.name}
        onChange={handleChange('name')}
      />
      <TextField 
        label="Age" 
        value={formData.age}
        onChange={handleChange('age')}
      />
      <TextField 
        label="Phone No" 
        value={formData.name}
        onChange={handleChange('name')}
        />
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          setGenId((prev) => prev.filter((item) => item !== id));
          onDataChange(id, null); 
        }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default DynamicForm;