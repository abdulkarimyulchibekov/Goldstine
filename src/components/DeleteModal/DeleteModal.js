import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useStore from '../../store/useStore';
import scope from '../../assets/images/scope.jpg';
import { Stack } from '@mui/system';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function BasicModal({ open, setOpen }) {
	const handleClose = () =>
		setOpen({
			...open,
			isOpen: false,
		});

	const people = useStore((state) => state.people);
	const deletePerson = useStore((state) => state.deletePerson);

	const handleDelete = (id) => {
		if (people) {
			const arr = people.filter((e) => e.id !== id);
			deletePerson(arr);
		}
	};

	return (
		<div>
			<Modal
				open={open.isOpen}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Stack alignItems={'center'} direction={'column'} spacing={10}>
						<img width={155} height={155} src={scope} alt='' />
						<Typography
							variant='h6'
							style={{ marginTop: 20, marginBottom: 20 }}>
							Are you sure to delete this record?
						</Typography>
						<Stack
							direction={'row'}
							spacing={10}
							style={{
								marginTop: 20,
							}}>
							<Button
								variant='contained'
								color='error'
								onClick={() => {
									handleDelete(open.id);
									handleClose();
								}}>
								Yes
							</Button>
							<Button
								variant='contained'
								color='inherit'
								onClick={() => {
									handleClose();
								}}>
								No
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
