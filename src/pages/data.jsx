import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch, TextField, Dialog,
  DialogActions, DialogContent, DialogTitle, Button, InputAdornment, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Sidebar from '../component/Sidebar';

function createData(id, name, designation, role, department, phone) {
  return { id, name, designation, role, department, phone };
}

let initialRows = [
  createData(1, 'David Billa', 'Manager', 'Admin', 'Operations', 9876543210),
  createData(2, 'Steve Rogers', 'Team Lead', 'Developer', 'Engineering', 9123456789),
  createData(3, 'Baasha', 'Senior Analyst', 'Data Analyst', 'Data Science', 9988776655),
  createData(4, 'Bruce Wayne', 'CEO', 'Executive', 'Management', 9876501234),
  createData(5, 'Deva', 'HR Executive', 'HR', 'Human Resources', 9012345678),
  createData(6, 'Leo Das', 'DevOps Engineer', 'Engineer', 'Infrastructure', 7894561230),
  createData(7, 'Vikram', 'Product Owner', 'Product Manager', 'Product', 8765432109),
  createData(8, 'Tony Stark', 'CTO', 'Executive', 'Technology', 9988665544),
  createData(9, 'Stephen Strange', 'Research Head', 'Scientist', 'R&D', 9112233445),
  createData(10, 'Desmond Miles', 'Support Agent', 'Customer Support', 'Support', 9090909090),
  createData(11, 'Kabaali', 'Security Lead', 'Security', 'Security', 9000011122),
  createData(12, 'Sathya', 'Backend Developer', 'Developer', 'Engineering', 8999888777),
  createData(13, 'Tom Cruise', 'UI/UX Designer', 'Designer', 'Design', 8877665544),
  createData(14, 'Arya Stark', 'QA Engineer', 'Tester', 'Quality Assurance', 9988771122),
  createData(15, 'Walter White', 'Chemist', 'Lab Tech', 'Chemical', 9345678901),
  createData(16, 'John Wick', 'Logistics Manager', 'Coordinator', 'Logistics', 9845098450),
  createData(17, 'Peter Parker', 'Intern', 'Support', 'Engineering', 9765432100),
];

const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'designation', numeric: false, disablePadding: false, label: 'Designation' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'department', numeric: false, disablePadding: false, label: 'Department' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone No.' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => onRequestSort(event, property);
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({
  numSelected,
  filterText,
  onFilterChange,
  onCreate,
  departmentFilter,
  onDepartmentFilterChange
}) {
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
        <Typography sx={{ flex: '1 1 100%' }} variant="h4" id="tableTitle">
          {numSelected > 0 ? `${numSelected} selected` : 'USER DATA'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {numSelected > 0 ? (
            <Tooltip title="Delete"><IconButton><DeleteIcon /></IconButton></Tooltip>
          ) : (
            <Tooltip title="Filter list"><IconButton></IconButton></Tooltip>
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
                <IconButton edge="end">
              
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Toolbar>
  );
}

function EditDialog({ open, onClose, onEdit, user }) {
  const [formData, setFormData] = React.useState({ ...user });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData({ ...user });
    setErrors({});
  }, [user]);

  const validate = () => {
    let tempErrors = {};

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
          value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name}
        />
        <TextField
          fullWidth margin="dense" label="Designation" name="designation"
          value={formData.designation} onChange={handleChange} error={!!errors.designation} helperText={errors.designation}
        />
        <TextField
          fullWidth margin="dense" label="Role" name="role"
          value={formData.role} onChange={handleChange} error={!!errors.role} helperText={errors.role}
        />
        <TextField
          fullWidth margin="dense" label="Department" name="department"
          value={formData.department} onChange={handleChange} error={!!errors.department} helperText={errors.department}
        />
        <TextField
          fullWidth margin="dense" label="Phone" name="phone"
          value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}


function CreateDialog({ open, onClose, onCreate }) {
  const [formData, setFormData] = React.useState({
    name: '', designation: '', role: '', department: '', phone: ''
  });

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    let tempErrors = {};

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
      onCreate(formData);
      onClose();
      setFormData({ name: '', designation: '', role: '', department: '', phone: '' });
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth margin="dense" label="Name" name="name"
          value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name}
        />
        <TextField
          fullWidth margin="dense" label="Designation" name="designation"
          value={formData.designation} onChange={handleChange} error={!!errors.designation} helperText={errors.designation}
        />
        <TextField
          fullWidth margin="dense" label="Role" name="role"
          value={formData.role} onChange={handleChange} error={!!errors.role} helperText={errors.role}
        />
        <TextField
          fullWidth margin="dense" label="Department" name="department"
          value={formData.department} onChange={handleChange} error={!!errors.department} helperText={errors.department}
        />
        <TextField
          fullWidth margin="dense" label="Phone" name="phone"
          value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterText, setFilterText] = React.useState('');
  const [departmentFilter, setDepartmentFilter] = React.useState('All Departments');
  const [rowsData, setRowsData] = React.useState(initialRows);
  const [editRow, setEditRow] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const handleEdit = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleSave = (updatedRow) => {
    const updatedRows = rowsData.map(r => r.id === updatedRow.id ? updatedRow : r);
    setRowsData(updatedRows);
  };

  const handleCreate = () => setCreateOpen(true);

  const handleAddNewRow = (newRow) => {
    const newId = Math.max(...rowsData.map(row => row.id)) + 1;
    const rowToAdd = { ...newRow, id: newId };
    setRowsData([...rowsData, rowToAdd]);
  };

  const handleDelete = (id) => {
    setRowsData(rowsData.filter(row => row.id !== id));
    setSelected(selected.filter(item => item !== id));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [...selected];
    if (selectedIndex === -1) newSelected.push(id);
    else newSelected.splice(selectedIndex, 1);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value.toLowerCase());
    setPage(0);
  };

  const handleDepartmentFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
    setPage(0);
  };

  const filteredRows = rowsData.filter((row) => {
    const departmentMatch = departmentFilter === 'All Departments' || row.department === departmentFilter;
    const textMatch = Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filterText)
    );
    return departmentMatch && textMatch;
  });

  const sortedRows = React.useMemo(
    () => [...filteredRows].sort(getComparator(order, orderBy)),
    [filteredRows, order, orderBy]
  );

  const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

  return (
    <Box sx={{ width: '100vw', display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          filterText={filterText}
          onFilterChange={handleFilterChange}
          onCreate={handleCreate}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={handleDepartmentFilterChange}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(row); }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={(e) => { e.stopPropagation(); setDeleteId(row.id); setConfirmDeleteOpen(true); }}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Dialogs */}
      <EditDialog open={editOpen} onClose={() => setEditOpen(false)} data={editRow} onSave={handleSave} />
      <CreateDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleAddNewRow} />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete(deleteId);
              setConfirmDeleteOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
