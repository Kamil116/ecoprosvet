import React, {useState} from 'react';
import {Button, TextField, Typography, Paper, Grid, Checkbox, FormControlLabel, Box, Link} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    function showToastSucessMessage() {
        toast.success('Вход выполнен', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('logged in')
        localStorage.setItem('loggedIn', 'true');

        showToastSucessMessage()

        setTimeout(() => {
            navigate('/');
        }, 3500);
    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.grey[50],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} md={6} component={Paper} elevation={6} square>
                <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Телефон, электронная почта или СНИЛС"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="showPassword" color="primary"/>}
                            label="Показать пароль"
                        />
                        <Button type="submit" fullWidth
                                variant="contained" color="primary" sx={{mt: 3, mb: 2}}>
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Восстановить пароль
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Зарегистрироваться"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <ToastContainer/>
        </Grid>
    );
};