import React, { useState } from 'react';
import Loading from '../../components/loading.jsx'
import ButtonBlack from '../../components/ButtonBlack';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Deletebook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://3.109.211.149:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
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
    <div>

        <h1 className='text-3xl my-4'>deletebook</h1>
      <ButtonBlack/>
        {loading ?<Loading/>:''}
        <div className='flex flex-col items-center border-2 border-sky-300 rounded-xl w-[600px] p-8 mx-auto '>
          <h3>confirm delete book</h3>
           <button className='p-4 bg-red-300 text-black m-8 w-full 'onClick={handleDeleteBook}>delete it</button>
           
        </div>

    </div>
  )
}

export default Deletebook
