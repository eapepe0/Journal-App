import React from "react";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Google from '@mui/icons-material/Google'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout";






export const RegisterPage = () => {
    return (
        <AuthLayout title="Register">
            <form action="">
                <Grid container >
                    <Grid item xs={12} sx={{ my: 1 }}>
                        <TextField
                            id=""
                            label="Nombre completo"
                            type='text'
                            placeholder="Tu nombre"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1 }}>
                        <TextField
                            id=""
                            label="Email"
                            type='email'
                            placeholder="tucorreo@mail.com"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id=""
                            label="Contraseña"
                            type='password'
                            placeholder="contraseña"
                            fullWidth
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ my: 1 }}>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" fullWidth>
                                Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'> Ingresar </Link>

                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
