import React, { useState } from 'react'
import ButtonBlack from '../../components/ButtonBlack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Loading from '../../components/loading.jsx'


const Createbook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishyear, setPublishyear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token);

    const { enqueueSnackbar } = useSnackbar();
  
    const handleSaveBook = () => {
      const data = {
        title,
        author,
        publishyear,
      };
      setLoading(true);
      axios
        .post('http://localhost:5000/books', data,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        })
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Book Created successfully', { variant: 'success' });
          navigate('/');
        })
        .catch((error) => {
          setLoading(false);
          // alert('An error happened. Please Chack console');
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
        });
    };
  return (
    <div className='p-4'>
      <ButtonBlack/>
      <h1 className='text-5ml my-4 text-center'>
      CreateBook
      </h1>
      {
        loading? (
          <loading />
        ) : (
    <div className='flex flex-col gap-4 border-2 border-sky-300 rounded-x1 w-[600px] p-4 mx-auto'>
           <div className='my-4'>
            <label className='text-xl mr-4 text-gray-400'>title</label>
            <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className='border-2 border-blue-400 px-4 py-2 w-full '>
            </input>
           </div>
           <div className='my-4'>
            <label className='text-xl mr-4 text-gray-400'>Author</label>
            <input type='text' value={author} onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-blue-400 px-4 py-2 w-full '>
            </input>
           </div>
           <div className='my-4'>
            <label className='text-xl mr-4 text-gray-400'>publishyear</label>
            <input type='text' value={publishyear} onChange={(e)=>setPublishyear(e.target.value)} className='border-2 border-blue-400 px-4 py-2 w-full '>
            </input> 
           </div>
           
           <button className='p-2  bg-blue-100 m-8 border-gray-900 border ' onClick={handleSaveBook} >summit</button>
           
   </div>
        )
      }
    </div> 
  )
}

export default Createbook;
