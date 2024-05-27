import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import { TextField, Button } from '@mui/material';
import ViewData from './ViewData';

function Dashboard() {
    const [data, setdata] = useState([]);
    const [newdata, setnewdata] = useState({ company: '', position: '' });
    const nevigate = useNavigate();
    const header = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    }

    /*  ------------------------------  ADD BUTTON HANDLE    ------------------------------  */

    const handlechange = (e) => {
        let { value, name } = e.target;
        setnewdata({ ...newdata, [name]: value });
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        postapi();
        setnewdata({ company: '', position: '' });
    }

    /*  ------------------------------  HANDLE LOGOUT    ------------------------------  */

    const handlelogout = () => {
        sessionStorage.removeItem('token');
        nevigate('/');
    }

    /*  ------------------------------  GETTING DATA FROM API    ------------------------------  */

    const getapi = async () => {
        try {
            const res = await axios.get('https://jobs-api-d70i.onrender.com/api/v1/jobs', header);
            setdata(res.data.jobs);
        } catch {
            (err) => {
                console.log(err)
            }
        }
    }
    const postapi = async () => {
        try {
            await axios.post('https://jobs-api-d70i.onrender.com/api/v1/jobs', newdata, header);
            getapi();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getapi();
    }, [])

    return (
        <div className={style.body}>
            <div className={style.up}>
                <span span className={style.span}>
                    <h2>Welcome, {sessionStorage.getItem('username')}</h2>
                </span>
                <span style={{flexGrow:1}}></span>
                <span className={style.span}>
                    <TextField
                        id="company"
                        name="company"
                        label="Company Name"
                        variant="outlined"
                        size='small'
                        value={newdata.company}
                        onChange={handlechange}
                        className={style.inp}
                    />
                    <TextField
                        id="position"
                        name="position"
                        label="Position"
                        variant="outlined"
                        size='small'
                        value={newdata.position}
                        onChange={handlechange}
                        className={style.inp}
                    />
                    <Button variant="outlined" onClick={handlesubmit}> + Add</Button>
                </span>
            </div>
            <div className={style.down}>
                {data.map(d => <ViewData key={d._id} data={d} api={getapi} />)}
            </div>
        </div>
    );
}

export default Dashboard;