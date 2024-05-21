import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import { FormControl, OutlinedInput, IconButton, InputAdornment, InputLabel, Button, FormHelperText } from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import loginside from '../assets/loginside.png'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setdata] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const url = import.meta.env.VITE_API_URL
    const navigate = useNavigate();



    const validateEmail = () => {
        const EmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        (!EmailRegex.test(data.email)) ? setEmailError('Invalid email address') : setEmailError('');
    };
    const validatePassword = () => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        (!passwordRegex.test(data.password)) ? setPasswordError('Password must be at least 8 characters long and Contain one upper case letter and a special character') : setPasswordError('')
    };


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handledata = (e) => { setdata({ ...data, [e.target.name]: e.target.value }) }

    
    const handleSubmit = async (e) => {
        validateEmail();
        validatePassword();
        e.preventDefault();
        if (emailError === '' && passwordError === '') {
            setdata({ email: '', password: '' });
            const res = await axios.post(`${url}/auth/login`, data);
            if (res) {
                sessionStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            }
        }
    };

    return (
        <div className={style.lg}>
            <div className={style.container}>
                <span><img src={loginside} /></span>
                <form>
                    <h1>LOGIN</h1>

                    <FormControl variant="outlined" error={emailError === '' ? false : true}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            name='email'
                            type='text'
                            label="email"
                            onChange={handledata}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton><Email /></IconButton>
                                </InputAdornment>
                            }
                        />
                        {emailError && <FormHelperText>{emailError}</FormHelperText>}
                    </FormControl>

                    <FormControl variant="outlined" error={passwordError === '' ? false : true}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            onChange={handledata}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
                    </FormControl>

                    <Button onClick={handleSubmit} variant="outlined" className={style.btn}>Login</Button>
                    <p>Don't have an account? <Link className={style.link} to='/register'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;