import React from 'react';
import {
  Toolbar, Typography, Box, Tooltip, IconButton, Button,
  TextField, InputAdornment, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';


const departments = [
  'All Departments',
  'Operations',
  'Engineering',
  'Data Science',
  'Management',
  'Human Resources',
  'Infrastructure',
  'Product',
  'Technology',
  'R&D',
  'Support',
  'Security',
  'Design',
  'Quality Assurance',
  'Chemical',
  'Logistics'
];

const EnhancedTableToolbar = ({
  numSelected,
  filterText,
  onFilterChange,
  onCreate,
  departmentFilter,
  onDepartmentFilterChange
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 }, pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ flex: '1 1 100%', mb: 3, fontWeight: 'bold' }}  variant="h4" color='primary' id="tableTitle">
          {numSelected > 0 ? `${numSelected} selected` : 'User Data'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton><DeleteIcon /></IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton />
            </Tooltip>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreate}
            sx={{ ml: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
        <TextField
          select
          variant="outlined"
          size="small"
          label="Department"
          value={departmentFilter}
          onChange={onDepartmentFilterChange}
          sx={{ minWidth: 180 }}
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Search by name, role, dept, etc."
          value={filterText}
          onChange={onFilterChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
