import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { SaveOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { ImageGallery } from "../components";

export const NoteView = () => {
	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			sx={{ mb: 1 }}
			className='animate__animated animate__fadeIn animate__faster'
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					28 de Agosto , 2023
				</Typography>
			</Grid>
			<Grid item>
				<Button color="primary" sx={{ padding: 2 }}>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un titulo"
					label="Titulo"
					sx={{ border: "none", mb: 1 }}
				/>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Que sucedio en el día de hoy?"
					minRows={5}
				/>
			</Grid>
			{/* GALERIAS DE IMAGENES */}
			<ImageGallery />
		</Grid>
	);
};
