import React,{ useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Create() {
    const [formdata,setFormdata] = useState({
        name: '',
        email: '',
        phone: '',
        image: null
    });


    const handleInput = (e)=>{
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name] : value,
        })
    }

    const handleInputImage = (e)=>{
        const file = e.target.files[0]           
        const FormDataImage = new FormData()     
        FormDataImage.append("name",formdata.name)   
        FormDataImage.append("email",formdata.email)
        FormDataImage.append("phone",formdata.phone)
        FormDataImage.append("image",file)

        setFormdata(FormDataImage)            
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        console.log('entered data',formdata)

        try{
            const response = await axios.post('http://127.0.0.1:8000/user_create/',formdata,{
                method :'POST',
                headers: {'Content-Type': 'multipart/form-data'},   
            })

            if (response.status == 201){
                toast.success('Data inserted successfully',{
                position :toast.POSITION.TOP_CENTER,
                theme : 'colored' })     
            }
        }catch(error){
            console.log('error')
        }
    }
  return (
    <>
    <div className='container shadow' style={{width:'30%',backgroundColor:'lightblue'}}>
        <form onSubmit={handleSubmit}>
            <div className='form-group p-3'>
                <label>Enter Name</label>
                <input type="text" className='form-control' name='name' onChange={handleInput}></input>
            </div>

            <div className='form-group p-3'>
                <label>Enter Mail</label>
                <input type="text" className='form-control' name='email' onChange={handleInput}></input>
            </div>

            <div className='form-group p-3'>
                <label>Enter Phone number</label>
                <input type="text" className='form-control' name='phone' onChange={handleInput}></input>
            </div>

            <div className='form-group p-3'>
                <label>Enter Image</label>
                <input type="file" className='form-control' name='image' accept='image/*' onChange={handleInputImage}></input>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
    </>
  );
}

export default Create;