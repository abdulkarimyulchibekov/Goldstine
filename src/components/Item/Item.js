import { Box, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./item.scss"
export const Item = ({ e }) => {
	return (
		<li style={{ width: '100%' }} className='item'>
			<Stack
				direction={'row'}
				spacing={13}
				style={{ padding: 20, alignItems: 'center' }}>
				<Typography variant='body2'>{e.full_name}</Typography>
				<Typography variant='body2'>{e.email}</Typography>
				<Typography variant='body2'>{e.mobile_phone}</Typography>
				<Typography variant='body2'>{e.department}</Typography>
				
			</Stack>
		</li>
	);
};
