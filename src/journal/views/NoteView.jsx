import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useMemo } from "react";
import { useEffect } from "react";
import { setActiveNote, startDeletingNotes, startSaveNotes, startUploadingFiles } from "../../store/journal";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useRef } from "react";


export const NoteView = () => {
	const fileInputRef = useRef(); // usamos el use ref en el input

	const dispatch = useDispatch()

	const { active: note, messageSaved, isSaving } = useSelector(state => state.journal) // como el active es medio ambiguo como nombre de constante la llamaremos note

	const { body, date, title, onInputChange, formState } = useForm(note) // extraemos del form el body, date , title

	const dateString = useMemo(() => { // memorizamos la funcion
		const newDate = new Date(date) // creamos un date con el date que tenemos en la nota
		return newDate.toUTCString(); // la convertimos
	}, [date]) // vuelve a recordar cada vez que cambia el date

	useEffect(() => {
		dispatch(setActiveNote(formState)) // pasamos los datos a la accion setActiveNote con los datos actualizados
	}, [formState]) // cada vez que cambia algo del formulario

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire('Nota actualizada', messageSaved, 'success') // si el mensaje es mayor a 0 o sea hay algo escrito , muestra la nota
		}
	}, [messageSaved]) // se ejecuta cada vez que cambia el mensaje guardado

	const onSaveNote = () => {
		dispatch(startSaveNotes())
	}

	const onFileInputChange = ({ target }) => {
		console.log(target.files)
		if (target.files === 0) return // si no hay ningun archivo seleccionado no hace nada
		const file = target.files;
		if (file) {
			dispatch(startUploadingFiles(file))
		}
	}

	const onDelete = () => {
		dispatch(startDeletingNotes())
	}

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems='center'
			sx={{ mb: 1 }}
			className='animate__animated animate__fadeIn animate__faster'
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<input
					type="file"
					multiple
					onChange={onFileInputChange}
					style={{ display: 'none' }}
					ref={fileInputRef}
				/>
				<IconButton
					color='primary'
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>

					<UploadOutlined />
				</IconButton>

				<Button
					onClick={onSaveNote}
					disabled={isSaving}
					color="primary"
					sx={{ padding: 2 }}>
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
					value={title}
					name='title'
					onChange={onInputChange}
				/>

				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Que sucedio en el día de hoy?"
					minRows={5}
					value={body}
					name='body'
					onChange={onInputChange}
				/>

			</Grid>
			<Grid container justifyContent='end'>
				<Button>
					<DeleteOutline onClick={onDelete} sx={{ mt: 2 }} color='error'>Borrar</DeleteOutline>
				</Button>
			</Grid>
			{/* GALERIAS DE IMAGENES */}
			<ImageGallery images={note.imageUrls} />
		</Grid>
	);
};
