import React from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Google from "@mui/icons-material/Google";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

// datos por defecto del Form
const formData = {
	email: "",
	password: "",
}

export const LoginPage = () => {

	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector(state => state.auth);
	//sacamos del state , el status (guarda si salio bien o no la operacion y el error)

	const { email, password, onInputChange } = useForm(formData);
	// con la actualizacion en el useForm con el useEffect dispara un loop infinito
	const isAuthenticating = useMemo(() => status === 'checking', [status]);
	// memoriza y se fija si el status se esta checkeando , se ejecuta cada vez que cambia el status

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(startLoginWithEmailPassword({ email, password }))
		// cuando apretamos el boton login , se envia el dispatch de start...
	};
	const onGoogleSignIn = () => {
		console.log('On GoogleSignIn')
		dispatch(startGoogleSignIn())
		// si se aprieta el boton google, se dispara la funcion
	};
	return (
		<AuthLayout title="Login">
			<form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster' test-id='submit-form'
			>
				<Grid container>
					<Grid item xs={12} sx={{ my: 1 }}>
						<TextField
							id=""
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							name="email"
							onChange={onInputChange}
							value={email}
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
							onChange={onInputChange}
							value={password}
						/>
					</Grid>
					<Grid container spacing={2} sx={{ my: 1 }}>
						<Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}> {/* doble negacion de undefined es false y doble de algo es verdadero */}
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant="contained" fullWidth type="submit" disabled={isAuthenticating}>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant="contained" fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating} aria-label='google-btn'>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
