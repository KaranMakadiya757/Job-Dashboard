import React, { useState } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import { FormControl, OutlinedInput, IconButton, InputAdornment, InputLabel, Button, FormHelperText } from '@mui/material';
import { Email, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import loginside from '../assets/loginside.png'
import { Link, useNavigate } from 'react-router-dom';

const Registeration = () => {
  const [data, setdata] = useState({ name: '', email: '', password: '' });
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handledata = (e) => { setdata({ ...data, [e.target.name]: e.target.value }) }

  const validateUser = () => {
    const UserRegex = /^[a-zA-Z0-9_]{3,16}$/;
    (!UserRegex.test(data.name)) ? setUserError('Username should only contain small letter, capital letter and digits') : setUserError('')
  };
  const validateEmail = () => {
    const EmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    (!EmailRegex.test(data.email)) ? setEmailError('Invalid email address') : setEmailError('')
  };
  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    (!passwordRegex.test(data.password)) ? setPasswordError('Password must be at least 8 characters long and Contain one upper case letter and a special character') : setPasswordError('')
  };

  const handleSubmit = (e) => {
    validateEmail();
    validatePassword();
    validateUser();
    e.preventDefault();
    if (userError === '' && passwordError == '' && emailError === '') {
      setdata({ name: '', email: '', password: '' });
      postapi();
    }
  };

  const postapi = async () => {
    const res = await axios.post('https://jobs-api-d70i.onrender.com/api/v1/auth/register', data);
    if (res) {
      navigate('/');
    }
  }


  return (
    <div className={style.lg}>
      <div className={style.container}>
        <span><img src={loginside} /></span>
        <form>
          <h1>Sign Up</h1>

          <FormControl variant="outlined" error={userError === '' ? false : true}>
            <InputLabel htmlFor="name">User Name</InputLabel>
            <OutlinedInput
              id="name"
              name='name'
              type='text'
              label="User Name"
              onChange={handledata}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton><Person /></IconButton>
                </InputAdornment>
              }
            />
            {userError && <FormHelperText>{userError}</FormHelperText>}
          </FormControl>

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
          <Button onClick={handleSubmit} variant="outlined" className={style.btn}>Sign Up</Button>
          <p>Already Created the account. That's great now <Link className={style.link} to='/'>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Registeration;