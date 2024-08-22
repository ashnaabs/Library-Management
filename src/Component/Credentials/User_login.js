import React,{useState} from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Admin_login from './Admin_login';


function User_login() {
    const[formdata,setFormdata] = useState({})
    const navigate = useNavigate()
    const handleInput = (e)=>{
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name] : value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formdata)

        try{
            const response = await fetch('http://127.0.0.1:8000/login_user/',{   //fetching the given data and stored in response
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify(formdata)
            })
            if (response.ok){
                toast.success('login succesful,'+ formdata.user_name,{     //if the data is in api, show login successful
                    position: toast.POSITION.TOP_CENTER,
                    theme:'colored',
                })
            navigate('/home2');
                
            }
            
            else{
                toast.error('invalid credentials,',{              //else failed
                    position: toast.POSITION.TOP_CENTER,
                    theme:'colored',
            })
        }
        }catch(error){}
    }

  return (
    <>
    <h2>Login</h2>
    <div className='container shadow' style={{width:'20%',backgroundColor:'lightblue'}}>
        <form onSubmit={handleSubmit}>

            <div className='form-group p-3'>
                <label>User name</label>
                <input type="text" className='form-control' name='user_name' onChange={handleInput}></input>
            </div>

            <div className='form-group p-3'>
                <label>Password</label>
                <input type="password" className='form-control' name='password' onChange={handleInput}></input>
            </div>

            <button className='btn btn-primary'>Submit</button>
        </form>
        <p style={{paddingBottom:20,paddingTop:10,paddingRight:10}}><b>Don't have an account?</b><Link to="/register">Register here</Link></p>
        </div>
        <button className='btn btn-danger btn-lg' style={{ padding: '10px 20px', borderRadius: '5px' ,width:'5 cm'}}><Link to="/admin-login" style={{ color: 'white', textDecoration: 'none' }}>Admin Login</Link></button>

    </>
  )
}

export default User_login;