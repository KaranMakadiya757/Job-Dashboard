import React, { useState } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import loginside from '../assets/loginside.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    const [data, setdata] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = () => {
        const EmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if (!EmailRegex.test(data.email)) {
            setEmailError('Invalid email address');
        }
        else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(data.password)) {
            setPasswordError('Password must be at least 8 characters long and Contain one upper case letter and a special character');
        }
        else {
            setPasswordError('');
        }
    };

    const handledata = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        validateEmail();
        validatePassword();
        if (emailError === '' && passwordError === '') {
            e.preventDefault();
            setdata({ name: '', email: '', password: '' });
            postapi();
        }
        else {
            e.preventDefault();
        }
    };

    const postapi = async () => {
        const res = await axios.post(`https://jobs-api-d70i.onrender.com/api/v1/auth/login`, data);
        if (res) {
            sessionStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        }
    }
    return (
        <div className={style.lg}>
            <div className={style.container}>
                <span><img src={loginside}/></span>
                <form onSubmit={handleSubmit}>
                    <h1>LOGIN</h1>

                    <div className={style.ibox}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={data.email}
                            name='email'
                            required
                            onChange={(e) => { handledata(e); }}
                        />
                        <FaUser className={style.icon} />
                    </div>
                    <span className={style.err}>{emailError}</span>

                    <div className={style.ibox}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            name='password'
                            required
                            onChange={(e) => { handledata(e); }}
                        />
                        <FaLock className={style.icon} />
                    </div>
                    <span className={style.err}>{passwordError}</span>
                    <button type="submit">LOGIN</button>
                    <p>Don't have an account? <Link className={style.link} to='/register'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;