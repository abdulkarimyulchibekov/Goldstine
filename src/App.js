import * as React from 'react';
import './app.scss';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ModalComponent } from './components/Modal/Modal';
import PrimarySearchAppBar from './components/Appbar/Appbar';
import AddIcon from '@mui/icons-material/Add';
import img from './assets/images/img.jpg';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import EnhancedTable from './components/Table/Table.js';
import { useState } from 'react';

export function App() {
	const [open, setOpen] = React.useState({
		isOpen: false,
	});

	const handleFormSubmit = () => {};

	const [search, setSearch] = useState('');

	return (
		<>
			<div className='App'>
				<Grid container spacing={0}>
					<Grid md={2} item xs={4}>
						<Box className='box'></Box>
					</Grid>
					<Grid item md={10} xs={8}>
						<PrimarySearchAppBar />
						<Stack style={{ padding: 50 }} direction='row' spacing={2}>
							<Box
								style={{
									boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
									padding: 10,
								}}>
								<img
									width={65}
									height={65}
									src={img}
									alt='too beautiful image'
								/>
							</Box>
							<Box>
								<Typography variant='h6'>New Employee</Typography>
								<Typography color={'GrayText'} variant='body2'>
									Form design with validation
								</Typography>
							</Box>
						</Stack>
						<Box style={{ backgroundColor: '#F4F5FD', padding: 25 }}>
							<Box
								style={{
									background: '#fff',
									padding: 25,
								}}>
								<Stack direction={'row'} spacing={25}>
									<TextField
										style={{ width: '70%', marginLeft: 35 }}
										id='outlined-basic'
										label='Search employees'
										variant='outlined'
										onChange={(evt) => setSearch(evt.target.value)}
									/>
									<Button
										onClick={() =>
											setOpen({
												isOpen: true,
											})
										}
										style={{ width: 150, textAlign: 'right' }}
										type={'submit'}
										variant='outlined'>
										<AddIcon style={{ marginRight: 15 }} />
										Add New
									</Button>
								</Stack>
							</Box>
							<EnhancedTable search={search} />
						</Box>
					</Grid>
				</Grid>
			</div>
			<ModalComponent
				handleFormSubmit={handleFormSubmit}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
}
