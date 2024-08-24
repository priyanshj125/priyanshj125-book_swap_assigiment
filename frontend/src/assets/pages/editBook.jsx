import React, { useState,useEffect } from 'react'
import ButtonBlack from '../../components/ButtonBlack';
import Spinner from '../../components/loading';
import axios from 'axios';
import Loading from '../../components/loading.jsx'

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishyear, setPublishyear] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { id } = useParams(); 
  useEffect(() => {
    console.log("Starting the fetch...");
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        console.log("Fetch successful:", response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishyear(response.data.publishyear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Fetch error:", error);
      });
  }, []);
  
    // const { enqueueSnackbar } = useSnackbar();
    const handleEditBook = () => {
      const data = {
        title,
        author,
        publishyear,
      };
      setLoading(true);
      axios
        .put(`http://localhost:5000/books/${id}`, data)
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
      Edit Book
      </h1>
      {
        loading? ( <Loading />
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
           
           <button className='p-2  bg-blue-100 m-8 border-gray-900 border ' onClick={handleEditBook} >summit</button>
           
   </div>
        )
      }
    </div> 
  )
}



export default EditBook
