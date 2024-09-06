import React, { useState } from 'react';
import ButtonBlack from '../../components/ButtonBlack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Loading from '../../components/loading'

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishyear, setpublishyear] = useState(''); // Fixed variable name
  const [message, setmessage] = useState(''); // Fixed variable name
  const [yemail, setyemail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async (e) => {

    const data = {
      title,
      author,
      publishyear,
      message // Fixed variable name
      ,yemail
    };
    setLoading(true);
    try {
      await axios.post('http://15.207.54.42:5000/books/addnotes',JSON.stringify({title,author,publishyear,message,yemail}), {
        headers: {
          "Authorization": ` ${token}`,
          "Content-Type": "application/json"
        },
      });
      setLoading(false);
      enqueueSnackbar('Book Created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      setLoading(false);

      console.log("errror call creatbook ............................");
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className='p-4'>
      <ButtonBlack />
      <h1 className='text-5xl my-4 text-center'>Create Book</h1>
      {loading ? (
        <Loading /> // Use correct capitalization
      ) : (
        <div className='flex flex-col gap-4 border-2 border-sky-300 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-400'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-blue-400 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-400'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-blue-400 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-400'>Publish Year</label>
            <input
              type='text'
              value={publishyear} // Fixed variable name
              onChange={(e) => setpublishyear(e.target.value)} // Fixed variable name
              className='border-2 border-blue-400 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-400'>contact Email</label>
            <input
              type='text'
              value={yemail} // Fixed variable name
              onChange={(e) => setyemail(e.target.value)} // Fixed variable name
              className='border-2 border-blue-400 px-4 py-2 w-full'
            />
          </div>

          <div className='my-2 '>
            <label className='text-xl mr-2  text-gray-400'>message</label>
            <input
              type='text'
              value={message} // Fixed variable name
              onChange={(e) => setmessage(e.target.value)} // Fixed variable name
              className='border-2 border-blue-400 h-32 px-4 py-2 w-full'
            />
          </div>
          <button
            className='p-2 bg-blue-100 m-8 border-gray-900 border'
            onClick={handleSaveBook}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
