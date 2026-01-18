import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
const formData = {
	email: "eapepe0@gmail.com",
	password: "123456",
	displayName: "Coloso12",
};

const formValidations = {
	email: [(value) => value.includes("@"), "El correo debe tener un @"],
	password: [
		(value) => value.length >= 6,
		"El password debe tener mas de 6 letras",
	],
	displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
	const dispatch = useDispatch();

	const [formSubmitted, setFormSubmitted] = useState(false); // creamos un estado donde formSubmitted es falso y su funcion 

	const { status, errorMessage } = useSelector(state => state.auth); // extraemos el status y errorMessage de authSlice

	const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
	const {
		displayName,
		displayNameValid,
		email,
		emailValid,
		password,
		passwordValid,
		formState,
		isFormValid,
		onInputChange,
	} = useForm(formData, formValidations);

	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmitted(true);
		if (!isFormValid) return;
		dispatch(startCreatingUserWithEmailPassword(formState))
	};
	return (
		<AuthLayout title="Register">
			<form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'
			>
				<Grid container>
					<Grid item xs={12} sx={{ my: 1 }}>
						<TextField
							id=""
							label="Nombre completo"
							type="text"
							placeholder="Tu nombre"
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ my: 1 }}>
						<TextField
							id=""
							label="Email"
							type="email"
							placeholder="tucorreo@mail.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id=""
							label="Contraseña"
							type="password"
							placeholder="contraseña"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>
					<Grid container spacing={2} sx={{ my: 1 }}>
						<Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}> {/* doble negacion de undefined es false y doble de algo es verdadero */}
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Button variant="contained" fullWidth type="submit" disabled={isCheckingAuthentication}>
								Crear Cuenta
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
