import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import Grid from '@mui/material/Grid'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth'
export const NavBar = ({ drawerWidth = 240 }) => {
	const dispatch = useDispatch();
	const onLogout = () => {
		dispatch(startLogout())
	}

	return (
		<AppBar position="fixed" sx={{
			width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: {
				sm: `${drawerWidth}px`
			}
		}}>
			<Toolbar>
				<IconButton color='inherit' edge='start' sx={{ mr: 2, display: { sm: 'none' } }} aria-label="">
					<MenuOutlinedIcon />
				</IconButton>
				<Grid container direction='row' justifyContent='space-between' alignItems='center'>
					<Typography variant='h6' noWrap component='div'>JournalApp</Typography>
					<IconButton color='error' onClick={onLogout}>
						<LogoutOutlined />
					</IconButton>
				</Grid>
			</Toolbar>
		</AppBar >
	)
}
