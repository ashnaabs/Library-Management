import React, { useEffect, useState } from 'react';
import axios from 'axios'
import BookCreate from './Bookcreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bookhome() {
    const [data,setData] = useState([]);
    const [details,setDetails] = useState([]);
    const [searchItem,setsearchItem] = useState('')   
    const filterData = data.filter((item)=>            
      item.book.toLowerCase().includes(searchItem.toLowerCase()) 
    )
    useEffect(()=>{
        axios
        .get('http://127.0.0.1:8000/book_create/')
        .then((response)=>{
            setData(response.data)
        })

        .catch(()=>{
            console.log('error')
        })
    })

    const updateDetails = (id)=>{
        console.log('id',id)
        fetch(`http://127.0.0.1:8000/book_details/${id}`)
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
        fetch(`http://127.0.0.1:8000/book_delete/${id}`,
        {method : 'DELETE'})
        .then(()=>{
          console.log('DELETED')
        })
      })

    const handleSubmit = async(e,id) =>{
        e.preventDefault();
        const requestdata = {
          id : details.id,
          book : details.book,
          author : details.author,
          ISBN : details.ISBN,
        };
        console.log('updated data',requestdata)
        const response = await axios.put(`http://127.0.0.1:8000/book_update/${id}`,requestdata,{
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
    <h3>Book Details</h3>
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
      <th scope="col"></th>
      <th scope="col">Book</th>
      <th scope="col">Author</th>
      <th scope="col">Category</th>
      <th scope="col">ISBN</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {records.map((item)=>(
        <tr>
        <th scope="row">{item.id}</th>
        <td><img src={item.image} style={{width:60}}></img></td>
        <td>{item.book}</td>
        <td>{item.author}</td>
        <td>{item.category}</td>
        <td>{item.ISBN}</td>
        <td><button onClick={()=>{updateDetails(item.id)}} data-bs-toggle="modal" data-bs-target="#staticBackdrop3" className='btn btn-primary' style={{marginRight:10}}>Update</button>
        <button onClick={()=>{updateDetails(item.id)}} className='btn btn-success' data-bs-toggle="modal" data-bs-target="#staticBackdrop4">Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" onClick={prevPage}>Previous</a></li>
    {
      numbers.map((n,i)=>(
        <li className= {`page-item ${currentPage === n ? 'active':''}`} key={i}><a className="page-link" onClick={()=>changePage(n)} href="#">{n}</a></li>
      ))
    }
  
    <li class="page-item"><a class="page-link" onClick={nextPage}>Next</a></li>
  </ul>
</nav>
</div>



<div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className='container'>
            <form onSubmit={(e)=>handleSubmit(e,details.id)}>
            <div className='form-group'>
                    <label>IMAGE</label>
                    <input type='text' className='form-control' value={details.image} onChange={(event)=>handleUpdate(event,'image')}></input>

                </div>
                <div className='form-group'>
                    <label>BOOK</label>
                    <input type='text' className='form-control' value={details.book} onChange={(event)=>handleUpdate(event,'book')}></input>

                </div>
                <div className='form-group'>
                    <label>AUTHOR</label>
                    <input type='text' className='form-control' value={details.author} onChange={(event)=>handleUpdate(event,'author')}></input>

                </div>
                <div className='form-group'>
                    <label>CATEGORY</label>
                    <input type='text' className='form-control' value={details.category} onChange={(event)=>handleUpdate(event,'category')}></input>

                </div>
                <div className='form-group'>
                    <label>ISBN</label>
                    <input type='text' className='form-control' value={details.ISBN} onChange={(event)=>handleUpdate(event,'ISBN')}></input>

                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>
      </div>
      <div className="modal-footer">
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
<BookCreate />
    </>
  );
};

export default Bookhome;