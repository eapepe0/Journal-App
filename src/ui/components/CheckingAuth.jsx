import React from 'react'
import Grid from "@mui/material/Grid";
import { CircularProgress } from '@mui/material';

export const CheckingAuth = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
		>
			<Grid item
				direction='row'
			>
				<CircularProgress color="warning" />

			</Grid>
		</Grid>
	)
}
