import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ButtonBlack from '../../components/ButtonBlack.jsx'
// import Loading from './component/los/loading'
import Loading from '../../components/loading.jsx'
import { Book } from '../../../../backend/model/bookmodel.js'

 
const ShowBook = () => {
  const [book,setBooks] = useState({}) ;
  const [loading,setloading] = useState(false)
  const {id}=useParams();
  useEffect(() => {
    setloading(true);
    axios
      .get(`http://3.109.211.149:5000/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  }, []);
  return (
    <div className='p-4'>
      <ButtonBlack />
      <h1 className='text-3xl my-4'>showbook</h1>
      {loading? (<Loading/>): (
        <div className='flex flex-col gap-4 border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
          <span className='text-x1 mr-4 text-gray-500'>ID</span>
          <span>{book._id}</span>
          </div>
          <div className='my-4'>
          <span className='text-x1 mr-4 text-gray-500'>Title</span>
          <span>{book. title}</span>
          </div>
          <div className='my-4'>
          <span className='text-x1 mr-4 text-gray-500'>author</span>
          <span>{book.author}</span>
          </div>
          <div className='my-4'>
          <span className='text-x1 mr-4 text-gray-500'>publishyear</span>
          <span>{book.publishyear  }</span>
          </div>
          <div className='my-4'>
          <span className='text-x1 mr-4 text-gray-500'>time</span>
          <span>{new Date(book.createdAt).toString( )}</span>
          </div>
          <div className='my-4'>
          <span className='text-x1 mr-4 text-gray-500'>last update</span>
          <span>{new Date(book.updateAt).toString() }</span>
          </div>

          </div>

          
          )
          }

      
    </div>
  )
}

export default ShowBook;
