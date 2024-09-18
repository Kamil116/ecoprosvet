import React, {useState} from 'react';
import {Button, TextField, Typography, Paper, Grid, Box, Link} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {Zoom, toast, ToastContainer} from "react-toastify";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    function isValidEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);

    }

    function showToastFailureMessage(errorText) {
        toast.error(errorText, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    }

    function showToastSuccessMessage() {
        toast.success('Успешная регистрация', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('test')
        if (!isValidEmail(email)) {
            showToastFailureMessage('Некорректная почта');
            setTimeout(() => {}, 3000)
            return;
        }
        if (password.length < 8) {
            showToastFailureMessage('Длина пароля должна быть минимум 8 символов');
            return;
        }
        if (password !== confirmPassword) {
            showToastFailureMessage('Пароли не совпадают')
            return;
        }

        showToastSuccessMessage();

        localStorage.setItem('loggedIn', 'true')
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
            >
                <h1>Доступ к экологической жизни Москвы</h1>
                <p>Департамент природопользования и охраны окружающей среды города Москвы</p>
            </Grid>
            <Grid item xs={12} md={6} component={Paper} elevation={6} square>
                <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            id="email"
                            fullWidth
                            label="Телефон, электронная почта или СНИЛС"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Подтвердите Пароль"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained"
                                color="primary" sx={{mt: 3, mb: 2}}>
                            Зарегистрироваться
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Уже зарегистрированы? Войти"}
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
