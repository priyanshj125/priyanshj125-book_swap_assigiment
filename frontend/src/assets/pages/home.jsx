import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
import Loading from '../../components/loading'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// import BooksTable from '../components/home/BooksTable';
// import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]) 
  const [loading,setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    axios.get('https://localhost:5000/books')
   .then((response) => { 
    setloading(false)
    setBooks(response.data.data) 
   }).catch((error) => {
    console.log(error );
    setloading(false);
   });
  },[]);
  return (
    <div className='p-4'>
      <div className='flex justify-between item-center'>
         <h1 className='text-3xl my-8'>book list</h1>
         <Link to='/books/create'>
            <MdOutlineAddBox size='30' className='test-sky-800 text-4xl' color='blue' />
         </Link> 

      </div>
      {loading ?(<Loading/>):(
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
               <th className='border border-slate-600 rounded-md'>no</th>
               <th className='border border-slate-600 rounded-md'>tiltle</th>
               <th className='border border-slate-600 rounded-md mx-md:hidden'>autour</th>
               <th className='border border-slate-600 rounded-md mx-md:hidden'>publishyear</th>
               <th className='border border-slate-600 rounded-md'>opreation </th>


            </tr>
          </thead>
          <tbody>
             {books.map((book,index)=> ( 
            <tr key={book._id} className='h-8 '>
              <td className='border border-slate-700 rounded-md text-center '>
              {index+1}
              </td>
              <td className='border border-slate-700 rounded-md:hidden'>
                {book.title}
              </td>
              <td className='border border-slate-700 rounded-md:hidden'>
                {book.author}
              </td>
              <td className='border border-slate-700 rounded-md:hidden'>
                {book.publisheyear}
              </td> 
              <td className='border border-slate-700 rounded-md'>
             
              <div className='flex justify-center gap x-4'>
                <Link to={`/book/details/${book._id}`}>
                 <BsInfoCircle size='25' className='text-sky-800' /> 
                 </Link>
                 <Link to={`/book/details/${book._id}`}>
                 <AiOutlineEdit size='25' className='text-red-400' /> 
                 </Link>
                 <Link to={`/book/details/${book._id}`}>
                 <MdOutlineDelete size='25' className='text-pink-300' /> 
                 </Link>

              </div>
              </td>
              
             </tr>
             )

            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home
