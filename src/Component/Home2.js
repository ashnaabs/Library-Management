import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './Create';
import { Link } from 'react-router-dom';

function Home2() {
    const [data,setData] = useState([]);
    const [details,setDetails] = useState([]);
    const [searchItem,setsearchItem] = useState('')   
    const filterData = data.filter((item)=>            
      item.name.toLowerCase().includes(searchItem.toLowerCase()) 
    )
    useEffect(()=>{
        axios
        .get('http://127.0.0.1:8000/user_create/')
        .then((response)=>{
            setData(response.data)
        })

        .catch(()=>{
            console.log('error')
        })
    })

    const updateDetails = (id)=>{
        console.log('id',id)
        fetch(`http://127.0.0.1:8000/user_details/${id}`)
        .then(response=>response.json())
        .then(resp=>setDetails(resp))
    }

    const handleUpdate  =(event,fieldname)=>{     
        const value = event.target.value;           //carrying the new value in const value
        setDetails((prevUpdate)=>({                   //setting updation, store old value in prevUpdate and give the new value to fieldname
          ...prevUpdate,
          [fieldname] : value,
  
        }))
      }

    const handleDelete = ((id)=>{
        fetch(`http://127.0.0.1:8000/delete/${id}`,
        {method : 'DELETE'})
        .then(()=>{
          console.log('DELETED')
        })
      })

    const handleSubmit = async(e,id) =>{
        e.preventDefault();
        const requestdata = {
          id : details.id,
          name : details.name,
          email : details.email,
          phone : details.phone,
        };
        console.log('updated data',requestdata)
        const response = await axios.put(`http://127.0.0.1:8000/user_update/${id}`,requestdata,{
          headers :{"content-type":"application/json"},
        })
  
        toast.success("User udated successfully",{
          position : toast.POSITION.BOTTOM_CENTER,
          theme : "colored"
        });
      }

    const [currentPage,setcurrentPage] =useState(1)
    const recordPerPage = 4
    const lastIndex = currentPage * recordPerPage;
    const first_Index = lastIndex - recordPerPage;
    const records = filterData.slice(first_Index,lastIndex);   //in paginator uses filtered data
    const npage = Math.ceil(data.length / recordPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1)

    function prevPage(){
      if(currentPage !== first_Index){
        setcurrentPage(currentPage-1)
      }
    }

    function nextPage(){
      if(currentPage !== lastIndex){
        setcurrentPage(currentPage+1)
      }
    }

    function changePage(id){
      setcurrentPage(id)
    }
  return (
    <>
    <h3>User Details</h3>
    <div className='container-lg p-5 shadow mb-5'>
    <div className='row'>                    
        <input type="text" className='form-control' placeholder='search here' style={{width:200}} value={searchItem}
         onChange={(e)=>{setsearchItem(e.target.value) 
          setcurrentPage(1) }}></input>
    </div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {records.map((item)=>(
        <tr>
        <th scope="row">{item.id}</th>
        <td><img src={item.image} style={{width:60,borderRadius:"50%"}}></img>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td><button onClick={()=>{updateDetails(item.id)}} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='btn btn-primary' style={{marginRight:10}}>Update</button>
        <button onClick={()=>{updateDetails(item.id)}} className='btn btn-success' data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" onClick={prevPage}>Previous</a></li>
    {
      numbers.map((n,i)=>(
        <li className= {`page-item ${currentPage === n ? 'active':''}`} key={i}><a className="page-link" onClick={()=>changePage(n)} href="#">{n}</a></li>
      ))
    }
    <li className="page-item"><a className="page-link"  onClick={nextPage}>Next</a></li>
  </ul>
</nav>
</div>



<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className='container'>
            <form onSubmit={(e)=>handleSubmit(e,details.id)}>
            <div className='form-group'>
                    <label>IMAGE</label>
                    <input type='text' className='form-control' value={details.image} onChange={(event)=>handleUpdate(event,'image')}></input>

                </div>
                <div className='form-group'>
                    <label>NAME</label>
                    <input type='text' className='form-control' value={details.name} onChange={(event)=>handleUpdate(event,'name')}></input>

                </div>
                <div className='form-group'>
                    <label>EMAIL</label>
                    <input type='text' className='form-control' value={details.email} onChange={(event)=>handleUpdate(event,'email')}></input>

                </div>
                <div className='form-group'>
                    <label>PHONE</label>
                    <input type='text' className='form-control' value={details.phone} onChange={(event)=>handleUpdate(event,'phone')}></input>

                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>
      
      <div className="modal-footer">
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className='container'>
      <p>do you wnat to delete {details.name}</p>

        </div>
      </div>
      <div className="modal-footer">
      <button type="button" onClick={()=>{handleDelete(details.id)}} className="btn btn-primary">Delete</button>
      </div>
    </div>
  </div>
</div>
<button className='btn btn-danger btn-lg' style={{ padding: '10px 20px', borderRadius: '5px' }}><Link to="/bookhome2" style={{ color: 'white', textDecoration: 'none' }}>Book Hub</Link></button>
<Create />
    </>
  );
};

export default Home2;