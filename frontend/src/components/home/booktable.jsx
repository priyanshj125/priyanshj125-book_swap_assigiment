import React from 'react'
// import Loading from '../../components/loading'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'; 

const Booktable = ({books}) => {
  return (
    <div>
         <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
               <th className='border border-blue-600 rounded-md'>no</th>
               <th className='border border-blue-600 rounded-md'>title</th>
               <th className='border border-blue-600 rounded-md md:'>author</th>
               <th className='border border-blue-600 rounded-md md:'>publishyear</th>
               <th className='border border-blue-600 rounded-md'>operation </th>


            </tr>
          </thead>
          <tbody>
             {books.map((book,index)=> ( 
            <tr key={book._id} className='h-8 '>
              <td className='border border-slate-700 rounded-md text-center '>
              {index+1}
              </td>
              <td className='border border-slate-700 rounded-md'>
                {book.title}
              </td>
              <td className='border border-slate-700 rounded-md'>
                {book.author}
              </td>
              <td className='border border-slate-700 rounded-md'>
                {book.publishyear}
              </td> 
              <td className='border border-slate-700 rounded-md'>
             
              <div className='flex justify-center gap x-4'>
                <Link to={`/books/details/${book._id}`}>
                 <BsInfoCircle size='25' className='text-sky-800' /> 
                 </Link>
                 <Link to={`/books/edit/${book._id}`}>
                 <AiOutlineEdit size='25' className='text-red-400' /> 
                 </Link>
                 <Link to={`/books/delete/${book._id}`}>
                 <MdOutlineDelete size='25' className='text-pink-300' /> 
                 </Link>

              </div>
              </td>
              
             </tr> 
             )

            )}
          </tbody>
        </table>
    </div>
  )
}

export default Booktable
