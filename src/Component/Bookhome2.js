import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bookhome2() {
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


        </div>
      </div>
      <div className="modal-footer">
    
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Bookhome2;