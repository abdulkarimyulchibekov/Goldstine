import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import {
	Box,
	Button,
	Checkbox,
	FormGroup,
	Modal,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import useStore from '../../store/useStore';
import { useState } from 'react';
import { useEffect } from 'react';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 900,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const ModalComponent = ({ setOpen, open }) => {
	const [department, setDepartment] = useState({});

	const localId = JSON.parse(localStorage.getItem('id'));
	const [id, setId] = React.useState(localId || 0);
	const editPerson = useStore((state) => state.editPerson);

	const addPerson = useStore((state) => state.addPerson);

	const handleChange = (event) => {
		setDepartment({
			value: event.target.value,
			label: event.target.value,
		});
	};

	const [value, setValue] = React.useState(dayjs());

	localStorage.setItem('id', JSON.stringify(id));

	useEffect(() => {
		setDepartment({
			value: open.defaultValue ? open.defaultValue.department : '',
			label: open.defaultValue ? open.defaultValue.department : '',
		});
	}, [open]);

	const checkValidation = {
		'& > div': {
			outline: '1px solid #f00',
		},
		'& > label': {
			color: 'red !important',
		},
		'& > div > fieldset': {
			borderColor: 'red !important',
		},
	};

	const [state, setState] = useState({
		full_name: false,
		email: false,
		mobile_phone: false,
		city: false,
		department: false,
	});

	return (
		<Modal
			open={open.isOpen}
			onClose={() => {
				setOpen({ isOpen: false });
			}}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<Box sx={style}>
				<form
					onSubmit={(evt) => {
						evt.preventDefault();
						const { full_name, email, city, mobile_phone } =
							evt.target.elements;
						if (
							full_name.value &&
							email.value &&
							city.value &&
							mobile_phone.value
						) {
							const data = {
								full_name: full_name.value,
								email: email.value,
								city: city.value,
								mobile_phone: mobile_phone.value,
								department: department.value,
								id: open?.defaultValue?.id ? open?.defaultValue?.id : id + 1,
							};
							setId(id + 1);
							if (open.defaultValue) {
								console.log('1');
								editPerson(open?.defaultValue?.id, data);
							} else if (!open.defaultValue) {
								console.log(2);
								addPerson(data);
							}
							setOpen({ isOpen: false });
						} else {
							setState({
								...state,
								full_name: true,
								email: true,
								mobile_phone: true,
								department: true,
							});
						}
					}}>
					<Stack direction={'column'} spacing={5}>
						<Stack
							style={{
								borderBottom: '1.4px solid grey',
								paddingBottom: 15,
							}}
							direction={'row'}
							spacing={74}>
							<Typography variant='h5'>Employee Form</Typography>
							<Button
								onClick={() => {
									setOpen({ isOpen: false });
								}}
								color='error'>
								<CloseIcon />
							</Button>
						</Stack>
						<Stack direction={'row'} spacing={3}>
							<Stack style={{ width: '50%' }} direction={'column'} spacing={2}>
								<TextField
									id='outlined-basic'
									label='Full Name'
									variant='outlined'
									name='full_name'
									sx={state.full_name ? checkValidation : null}
									onChange={(evt) => {
										if (!evt.target.value) {
											setState({
												...state,
												full_name: true,
											});
										} else {
											setState({
												...state,
												full_name: false,
											});
										}
									}}
									defaultValue={open?.defaultValue?.full_name}
								/>
								{state.full_name == true ? (
									<span style={{ color: 'red', fontSize: 14 }}>
										Full name is required
									</span>
								) : (
									<></>
								)}
								<TextField
									id='outlined-basic'
									label='Email'
									type={'text'}
									variant='outlined'
									name='email'
									sx={state.email ? checkValidation : null}
									onChange={(evt) => {
										if (
											!evt.target.value.match(
												/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
											)
										) {
											setState({
												...state,
												email: true,
											});
										} else if (evt.target.value == '') {
											setState({
												...state,
												email: true,
											});
										} else if (evt.target.value.includes(' ')) {
											setState({
												...state,
												email: true,
											});
										} else {
											setState({
												...state,
												email: false,
											});
										}
									}}
									defaultValue={open?.defaultValue?.email}
								/>
								{state.email == true && (
									<span style={{ color: 'red', fontSize: 14 }}>
										enter a valid email
									</span>
								)}
								<TextField
									id='outlined-basic'
									label='Mobile'
									variant='outlined'
									name='mobile_phone'
									sx={state.mobile_phone ? checkValidation : null}
									onChange={(evt) => {
										if (evt.target.value.length < 9) {
											setState({
												...state,
												mobile_phone: true,
											});
										} else if (evt.target.value.includes(' ')) {
											setState({
												...state,
												mobile_phone: true,
											});
										} else if (
											evt.target.value.match(/[!@#$%^&*]/g) ||
											evt.target.value.match(/([a-z])\w+/gi)
										) {
											setState({
												...state,
												mobile_phone: true,
											});
										} else {
											setState({
												...state,
												mobile_phone: false,
											});
										}
									}}
									defaultValue={open?.defaultValue?.mobile_phone}
								/>
								{state.mobile_phone && (
									<span style={{ color: 'red', fontSize: 14 }}>
										Enter valid phone number
									</span>
								)}
								<TextField
									id='outlined-basic'
									label='City'
									variant='outlined'
									name='city'
									defaultValue={open?.defaultValue?.city}
								/>
							</Stack>
							<Stack style={{ width: '50%' }} spacing={2}>
								<FormControl>
									<RadioGroup
										aria-labelledby='demo-radio-buttons-group-label'
										defaultValue='female'
										style={{ display: 'flex', flexDirection: 'row' }}
										name='radio-buttons-group'>
										<FormControlLabel
											style={{ width: 100 }}
											value='female'
											control={<Radio />}
											label='Female'
										/>
										<FormControlLabel
											style={{ width: 100 }}
											value='male'
											control={<Radio />}
											label='Male'
										/>
										<FormControlLabel
											style={{ width: 100 }}
											value='other'
											control={<Radio />}
											label='Other'
										/>
									</RadioGroup>
								</FormControl>
								<Box sx={{ minWidth: 120 }}>
									<FormControl fullWidth>
										<InputLabel id='demo-simple-select-label'>
											Department
										</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={department.value}
											defaultValue={''}
											name='department'
											label='Department'
											onChange={handleChange}>
											<MenuItem value={'None'}>None</MenuItem>
											<MenuItem value={'Development'}>Development</MenuItem>
											<MenuItem value={'Marketing'}>Marketing</MenuItem>
											<MenuItem value={'Accounting'}>Accounting</MenuItem>
											<MenuItem value={'HR'}>HR</MenuItem>
										</Select>
									</FormControl>
								</Box>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Stack spacing={3}>
										<DatePicker
											disableFuture
											label='Responsive'
											openTo='year'
											views={['year', 'month', 'day']}
											value={value}
											onChange={(newValue) => {
												setValue(newValue);
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</Stack>
								</LocalizationProvider>
								<FormGroup>
									<FormControlLabel
										control={<Checkbox />}
										label='Permanent Employee'
									/>
								</FormGroup>
								<Stack direction={'row'} spacing={2}>
									<Button type='submit' variant='contained' color='primary'>
										Submit
									</Button>
									<Button
										onClick={() =>
											setState({
												full_name: false,
												email: false,
												mobile_phone: false,
												city: false,
												department: false,
											})
										}
										type='reset'
										variant='contained'
										color='inherit'>
										Reset
									</Button>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</form>
			</Box>
		</Modal>
	);
};
