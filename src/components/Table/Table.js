import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import useStore from '../../store/useStore';
import { visuallyHidden } from '@mui/utils';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { ModalComponent } from '../Modal/Modal';
import BasicModal from '../DeleteModal/DeleteModal';
// import { alpha } from '@mui/material/styles';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';

function createData(full_name, email, mobile_phone, department, id, city) {
	return {
		full_name,
		email,
		mobile_phone,
		department,
		city,
		id,
	};
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'full_name',
		numeric: false,
		disablePadding: true,
		label: 'Employee name',
	},
	{
		id: 'email',
		numeric: true,
		disablePadding: false,
		label: 'Email Address (Personal)',
	},
	{
		id: 'mobile_phone',
		numeric: true,
		disablePadding: false,
		label: 'Mobile Phone',
	},
	{
		id: 'department',
		numeric: true,
		disablePadding: false,
		label: 'Department',
	},
	{
		id: '',
		numeric: false,
		disablePadding: false,
		label: 'Action',
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'></TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id && headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={headCell.id ? createSortHandler(headCell.id) : () => {}}>
							{headCell.label}
							{headCell.id === '' ? (
								orderBy === headCell.id ? (
									<Box component='span' sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};
export default function EnhancedTable({ search }) {
	const people = useStore((state) => state.people);
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const rows = people.map((e) =>
		createData(
			e.full_name,
			e.email,
			e.mobile_phone,
			e.department,
			e.id,
			e.city,
		),
	);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.name);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const [open, setOpen] = React.useState({
		isOpen: false,
		id: null,
	});

	const [modalOpen, setModalOpen] = React.useState({
		defaultValue: {},
		isOpen: false,
	});

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.filter((item) => {
									if (search === '') {
										return item;
									} else if (
										item?.full_name &&
										item.full_name.toLowerCase().includes(search?.toLowerCase())
									) {
										return item;
									}
								})
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;
									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.name)}
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}>
											<TableCell padding='checkbox'></TableCell>
											<TableCell
												component='th'
												id={labelId}
												scope='row'
												padding='none'>
												{row.full_name}
											</TableCell>
											<TableCell align='right'>{row.email}</TableCell>
											<TableCell align='right'>{row.mobile_phone}</TableCell>
											<TableCell align='right'>{row.department}</TableCell>
											<TableCell align='left'>
												<IconButton
													onClick={() =>
														setOpen({
															isOpen: true,
															id: row.id,
														})
													}
													sx={{
														background: '#FEE0E3',
														marginRight: 1,
														borderRadius: 2,
													}}>
													<ClearIcon color='error' />
												</IconButton>
												<IconButton
													onClick={() =>
														setModalOpen({ isOpen: true, defaultValue: row })
													}
													sx={{
														background: '#E2E3F3',
														borderRadius: 2,
													}}>
													<EditIcon color='primary' />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<ModalComponent open={modalOpen} setOpen={setModalOpen} />
			<BasicModal open={open} setOpen={setOpen} />
		</Box>
	);
}
