import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './styles.module.css'
import { format } from 'date-fns'

function ViewData({ data, api }) {
    const [edit, setedit] = useState(false);
    const [newdata, setnewdata] = useState({ company: '', position: '' })
    const header = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    }

    const handlechange = (e) => {
        setnewdata({...newdata, [e.target.id] : e.target.value});
    }
 
    const handleEdit = async () => {
        setnewdata(data)
        if(edit) {handleSave()}
        setedit(!edit);
    };

    const handleSave = async () => {
        await axios.patch(`https://jobs-api-d70i.onrender.com/api/v1/jobs/${data._id}`, newdata, header);
        api();
    };

    const handledelete = async () => {
        await axios.delete(`https://jobs-api-d70i.onrender.com/api/v1/jobs/${data._id}`, header);
        api();
    }

    return (
        <div className={style.viewdata}>
            <span>
                <label> Company Name </label>
                {edit ?
                    (<input 
                        type='text'
                        id='company'
                        value={newdata.company}
                        onChange={handlechange}
                    />) 
                    : (<p>{data.company}</p>)
                }

            </span>
            <span>
                <label> Position </label>
                {edit ?
                    (<input 
                        type='text'
                        id='position'
                        value={newdata.position}
                        onChange={handlechange}
                    />) 
                    : (<p>{data.position}</p>)
                }
            </span>
            <span>
                <label> Created At </label>
                <p>{format(data.createdAt, 'dd/MM/yyyy')}</p>
            </span>
            <span>
                <label> Updated At </label>
                <p>{format(data.updatedAt, 'dd/MM/yyyy')}</p>
            </span>
            <span>
                <label> Status </label>
                <p style={{color : data.status === 'pending' ? 'orange' : data.status === 'done'  ? 'green' : 'red'}}>{data.status}</p>

            </span>
            <div style={{display: 'flex'}}>
                <button onClick={handleEdit}>{edit ? '📁' : '✏️'}</button>
                <button onClick={handledelete}>❌</button>
            </div>
        </div>
    )
}

export default ViewData
