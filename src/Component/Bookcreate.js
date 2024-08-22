import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function BookCreate() {
    const [formdata, setFormdata] = useState({
        book: '',
        author: '',
        category: '',
        ISBN: '',
        image: null
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value,
        });
    };

    const handleInputImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormdata({
                ...formdata,
                image: file
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("book", formdata.book);
        formDataToSend.append("author", formdata.author);
        formDataToSend.append("category", formdata.category);
        formDataToSend.append("ISBN", formdata.ISBN);
        if (formdata.image) {
            formDataToSend.append("image", formdata.image);
        } else {
            toast.error('Please upload an image.', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            return;
        }

        console.log('entered data', formDataToSend);

        try {
            const response = await axios.post('http://127.0.0.1:8000/book_create/', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                toast.success('Data inserted successfully', {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
            } else {
                toast.error('Failed to insert data', {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
            }
        } catch (error) {
            console.error('error', error);
            toast.error('Failed to insert data', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='container shadow' style={{ width: '30%', backgroundColor:'lightblue'}}>
                <form onSubmit={handleSubmit}>
                    <div className='form-group p-3'>
                        <label>Enter Book</label>
                        <input type="text" className='form-control' name='book' onChange={handleInput} />
                    </div>

                    <div className='form-group p-3'>
                        <label>Enter Author</label>
                        <input type="text" className='form-control' name='author' onChange={handleInput} />
                    </div>

                    <div className='form-group p-3'>
                        <label>Enter Category</label>
                        <input type="text" className='form-control' name='category' onChange={handleInput} />
                    </div>

                    <div className='form-group p-3'>
                        <label>Enter ISBN</label>
                        <input type="text" className='form-control' name='ISBN' onChange={handleInput} />
                    </div>

                    <div className='form-group p-3'>
                        <label>Enter Image</label>
                        <input type="file" className='form-control' name='image' accept='image/*' onChange={handleInputImage} />
                    </div>
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default BookCreate;
