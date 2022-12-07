import React from "react";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Google from '@mui/icons-material/Google'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout";





export const LoginPage = () => {
    return (
        <AuthLayout title="Login">
            <form action="">
                <Grid container >
                    <Grid item xs={12} sx={{ my: 1 }}>
                        <TextField
                            id=""
                            label="Correo"
                            type='email'
                            placeholder="correo@google.com"
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
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to='/auth/register'> Crear una cuenta </Link>

                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
