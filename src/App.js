import styled from '@emotion/styled';
import { Box, Grid, Paper, Stack } from '@mui/material';
import PrimarySearchAppBar from './components/Appbar/Appbar';
import './app.scss';
const Item = styled(Paper)(({ theme }) => ({
	// backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	// ...theme.typography.body2,
	// color: theme.palette.text.secondary,
	padding: '1rem',
	textAlign: 'center',
}));

function App() {
	return (
		<div className='App'>
			<Grid container spacing={0}>
				<Grid md={2} item xs={4}>
					<Box className='box'></Box>
				</Grid>
				<Grid item md={10} xs={8}>
					<PrimarySearchAppBar />
				</Grid>
			</Grid>
			<Stack direction='row' spacing={2}>
				<Item>qwerty1</Item>
				<Item>qwerty2</Item>
			</Stack>
		</div>
	);
}

export default App;
