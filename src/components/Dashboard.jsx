import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';

function Dashboard() {
    const [data, setdata] = useState([]);
    const [newdata, setnewdata] = useState({ company: '', position: '' });
    const [add, setadd] = useState(false);
    const [edit, setedit] = useState(null);
    const nevigate = useNavigate();
    const header = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    }

    /*  ------------------------------  EDIT BUTTON HANDLE    ------------------------------  */

    const handleEdit = async (idd) => {
        const res = await axios.get(`https://jobs-api-d70i.onrender.com/api/v1/jobs/${idd}`, header);
        console.log(res.data.job)
        setnewdata(res.data.job);
        setedit(idd);
        setadd(false);
    };

    const handleSave = async (id) => {
        await axios.patch(`https://jobs-api-d70i.onrender.com/api/v1/jobs/${id}`, newdata, header);
        getapi();
        setedit(null);
    };

    const handleeditChange = (e) => {
        let { value, name } = e.target;
        setnewdata({ ...newdata, [name]: value });
    };

    /*  ------------------------------  DELETE BUTTON HANDLE    ------------------------------  */

    const handledelete = async (id) => {
        await axios.delete(`https://jobs-api-d70i.onrender.com/api/v1/jobs/${id}`, header);
        getapi();
    }

    /*  ------------------------------  ADD BUTTON HANDLE    ------------------------------  */

    const handleadd = () => {
        setadd(!add);
    }
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
            const res = await axios.post('https://jobs-api-d70i.onrender.com/api/v1/jobs', newdata, header);
            getapi();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getapi();
    }, [])

    return (
        <div className={style.dash}>
            <div >
                <div className={style.title}>
                    <h1>Dashboard</h1>
                    <button className={style.action} onClick={() => handleadd()}>Add</button>
                </div>
                {add && (
                    <div className={style.adddata}>

                        {/* ADDING NEW ENTRIES INTO THE TABLE */}
                        <form onSubmit={(e) => handlesubmit(e)}>
                            <input
                                type="text"
                                name="company"
                                placeholder='Company Name'
                                value={newdata.company}
                                className={style.inputa}
                                onChange={(e) => handlechange(e)}
                                required
                            />

                            <input
                                type="text"
                                name="position"
                                placeholder='Position'
                                value={newdata.position}
                                className={style.inputa}
                                onChange={(e) => handlechange(e)}
                                required
                            />

                            <input
                                type="submit"
                                value='Save'
                                className={style.action}
                            />
                        </form>
                    </div>
                )}

                {/* MAIN TABLE */}
                <table className={style.table}>
                    <thead className={style.thead}>

                        <tr>
                            <th className={style.td}>Company</th>
                            <th className={style.td}>Position</th>
                            <th className={style.td}>Action</th>
                        </tr>
                    </thead>
                    <tbody className={style.tbody}>
                        {/* MAPPING THROUGH THE DATA ARRAY TO PRINT EACH ROW */}
                        {data.map((d) =>
                            <tr key={d._id}>
                                <td className={style.td}>
                                    {
                                        // EDIT BUTTON FUNCTIONALITY
                                        edit === d._id ? (
                                            <input
                                                className={style.inputb}
                                                type="text"
                                                placeholder='Company'
                                                name='company'
                                                value={newdata.company}
                                                onChange={handleeditChange}
                                            />
                                        ) : (d.company)
                                    }
                                </td>
                                <td className={style.td}>
                                    {
                                        // EDIT BUTTON FUNCTIONALITY
                                        edit === d._id ? (
                                            <input
                                                className={style.inputb}
                                                type="text"
                                                placeholder='Position'
                                                name='position'
                                                value={newdata.position}
                                                onChange={handleeditChange}
                                            />
                                        ) : (d.position)
                                    }
                                </td>
                                <td className={style.td}>
                                    {
                                        //  EDIT/SAVE BUTTON
                                        edit === d._id ? (
                                            <button className={style.action} onClick={() => handleSave(d._id)}>Save</button>
                                        ) : (
                                            <button className={style.action} onClick={() => handleEdit(d._id)}>Edit</button>
                                        )
                                    }

                                    {/* DELETE BUTTON */}
                                    <button className={style.action} onClick={() => handledelete(d._id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className={style.logout}>
                    <button className={style.action} onClick={handlelogout}>LogOut</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;