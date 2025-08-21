import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Paper, Checkbox,
  IconButton, Tooltip, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

import Sidebar from '../component/Sidebar';
import EnhancedTableToolbar from '../component/EnhancedTableToolbar';
import EditDialog from '../component/EditDialog';
import DeleteConfirmDialog from '../component/DeleteConfirmDialog';

const createData = (id, name, designation, role, department, phone) => ({ id, name, designation, role, department, phone });

const initialRows = [
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

// --- Table Headers
const headCells = [
  { id: 'id', label: 'ID', numeric: true },
  { id: 'name', label: 'Name' },
  { id: 'designation', label: 'Designation' },
  { id: 'role', label: 'Role' },
  { id: 'department', label: 'Department' },
  { id: 'phone', label: 'Phone No.', numeric: true },
  { id: 'action', label: 'Action' }
];

// --- Sorting
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => (
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
);

// --- Table Head Component
function EnhancedTableHead({ order, orderBy, numSelected, rowCount, onSelectAllClick, onRequestSort }) {
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <TableHead sx={{ background: 'linear-gradient(90deg, #519ae3ff, #42a5f5)' }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ color: 'white' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: 0.5,
              fontSize: '0.95rem'
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                '& .MuiTableSortLabel-icon': { color: 'white' },
                color: 'white'
              }}
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

// --- Main Table Component
export default function EnhancedTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterText, setFilterText] = React.useState('');
  const [departmentFilter, setDepartmentFilter] = React.useState('All Departments');
  const [editOpen, setEditOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const allIds = filteredRows.map(row => row.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    const newSelected = [...selected];
    if (selectedIndex === -1) newSelected.push(id);
    else newSelected.splice(selectedIndex, 1);
    setSelected(newSelected);
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
    setSelected(selected.filter(item => item !== id));
  };

  const handleEdit = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleSave = (updatedRow) => {
    const updated = rows.map(r => r.id === updatedRow.id ? updatedRow : r);
    setRows(updated);
  };

  const filteredRows = rows.filter((row) => {
    const deptMatch = departmentFilter === 'All Departments' || row.department === departmentFilter;
    const textMatch = Object.values(row).some(val =>
      String(val).toLowerCase().includes(filterText.toLowerCase())
    );
    return deptMatch && textMatch;
  });

  const sortedRows = React.useMemo(() => (
    [...filteredRows].sort(getComparator(order, orderBy))
  ), [filteredRows, order, orderBy]);

  const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f4f6f8' }}>
      <Sidebar />
      <Paper
        sx={{
          width: '100%',
          mx: 2,
          my: 3,
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg,#ffffff,#e3f2fd)'
        }}
      >
        {/* Toolbar */}
        <EnhancedTableToolbar
          numSelected={selected.length}
          filterText={filterText}
          onFilterChange={(e) => setFilterText(e.target.value)}
          onCreate={() => setEditOpen(true)}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={(e) => setDepartmentFilter(e.target.value)}
        />

        {/* Table */}
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              rowCount={filteredRows.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isSelected = selected.includes(row.id);
                return (
                  <TableRow
                    hover
                    key={row.id}
                    selected={isSelected}
                    onClick={(e) => handleRowClick(e, row.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f1f9ff' },
                      '&.Mui-selected': {
                        backgroundColor: '#e3f2fd !important'
                      }
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell><Typography fontWeight={600}>{row.id}</Typography></TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(row); }}>
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(row.id);
                          setConfirmDeleteOpen(true);
                        }}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            borderTop: '1px solid #ddd',
            backgroundColor: '#fafafa'
          }}
        />
      </Paper>

      {/* Edit Dialog */}
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onEdit={handleSave}
        user={editRow}
      />

      {/* Delete Confirm */}
      <DeleteConfirmDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={() => {
          handleDelete(deleteId);
          setConfirmDeleteOpen(false);
        }}
      />
    </Box>
  );
}
