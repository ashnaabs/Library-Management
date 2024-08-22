import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const[formdata,setFormdata] = useState({})
    const navigate = useNavigate()
    const handleInput = (e)=>{
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name] : value,
        })
    }

    const Checkvalidation = ()=>{
        const required = ['admin_name','user_name','password','c_password']
        for(const field of required){                       //for loop for fields
            if(!formdata[field]){                             //if any field is empty
                toast.warning(`${field.replace('_','')} is required`,{
                    position:toast.POSITION.TOP_CENTER,
                    theme:'colored',
                });
                return false;
            }
        }
    
        if (formdata.password !== formdata.c_password){
            toast.warning('password is not matching',{
                position:toast.POSITION.TOP_CENTER,
                theme:'colored',
            });
            return false;
        }
        return true;

    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('entered data',formdata)
        if(!Checkvalidation()){
            return;
        }

        try{
            const response = await axios.post('http://127.0.0.1:8000/user_register/',formdata,{
                method :'POST',
                headers: {'Content-Type': 'application/json'},
            })

            if (response.status === 201){
                toast.success('Admin inserted successfully',{
                position :toast.POSITION.TOP_CENTER,
                theme : 'colored' }) 
                
            navigate('/');
            }
            
        }catch(error){
            console.log('error')
            toast.success('Admin not inserted successfully',{
                position :toast.POSITION.TOP_CENTER,
                theme : 'colored' })
        }
    }
  return (
    <>
    <h2>Registration</h2>
    <div className='container shadow' style={{width:'20%',backgroundColor:'lightblue'}}>
        <form onSubmit={handleSubmit}>
            <div className='form-group lg p-3'>
                <label> Admin Name</label>
                <input type="text" className='form-control' name='admin_name' onChange={handleInput}></input>
            </div>

            <div className='form-group p-3'>
                <label>User name</label>
                <input type="text" className='form-control' name='user_name' onChange={handleInput}></input>
            </div>

            <div className='form-group p-3'>
                <label>Password</label>
                <input type="password" className='form-control' name='password' onChange={handleInput}></input>
            </div>

            <div className='form-group p-3'>
                <label>Confirm password</label>
                <input type="password" className='form-control' name='c_password' onChange={handleInput}></input>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form></div>
    </>
  );
}

export default Register;