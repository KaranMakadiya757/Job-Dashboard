import axios from 'axios';
import React, { useState } from 'react';
import style from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Registeration = () => {
  const [data, setdata] = useState({ name: '', email: '', password: '' });
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handledata = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const validateUser = () => {
    const UserRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!UserRegex.test(data.name)) {
      setUserError('Username should only contain small letter, capital letter and digits');
      console.log(data);
      console.log(userError);
    }
    else {
      setUserError('');
    }
  };
  const validateEmail = () => {
    const EmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!EmailRegex.test(data.email)) {
      setEmailError('Invalid email address');
      console.log(data);
      console.log(emailError);

    }
    else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      setPasswordError('Password must be at least 8 characters long and Contain one upper case letter and a special character');
      console.log(data);
      console.log(passwordError);

    }
    else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    validateEmail();
    validatePassword();
    validateUser();
    if (userError === '' && passwordError == '' && emailError === '') {
      console.log('success')
      e.preventDefault();
      setdata({ name: '', email: '', password: '' });
      postapi();
    }
    else {
      e.preventDefault();
    }
  };

  const postapi = async () => {
    const res = await axios.post('https://jobs-api-d70i.onrender.com/api/v1/auth/register', data);
    if (res) {
      navigate('/login');
    }
  }


  return (
    <div className={style.lg}>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1 className={style.h1}>REGISTRATION</h1>
          <div className={style.ibox}>
            <input
              id='name'
              className={style.input}
              type="text"
              placeholder="Username"
              name='name'
              value={data.name}
              required
              onChange={(e) => { handledata(e); }}
            />
            <FaUser className={style.icon} />
          </div>
          <span className={style.err}>{userError}</span>
          <div className={style.ibox}>
            <input
              id='email'
              className={style.input}
              type="text"
              placeholder="Email"
              name='email'
              value={data.email}
              required
              onChange={(e) => { handledata(e); }}
            />
            <MdEmail className={style.icon} />
          </div>
          <span className={style.err}>{emailError}</span>
          <div className={style.ibox}>
            <input
              id='pswd'
              className={style.input}
              type="password"
              placeholder="Password"
              name='password'
              value={data.password}
              required
              onChange={(e) => { handledata(e); }}
            />
            <FaLock className={style.icon} />
          </div>
          <span className={style.err}>{passwordError}</span>
          <button className={style.button} type="submit">REGISTER</button>
          <p>Already Created the account. That's great now <Link className={style.link} to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Registeration;