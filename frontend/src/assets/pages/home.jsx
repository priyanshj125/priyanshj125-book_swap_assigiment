import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
import Loading from '../../components/loading'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'; 
import Booktable from '../../components/home/booktable';
import Card from '../../components/home/card';
const Home = () => {
  const [books, setBooks] = useState([]) 
  const [loading,setloading] = useState(false)
  const [ShowType,setShowType] = useState('table') 
  useEffect(() => {
    setloading(true)
    axios.get('http://localhost:5000/books')
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
       <div className='flex justify-center items-center gap-x-4'>   
        <button 
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between item-center'>
         <h1 className='text-3xl my-8'>all book list</h1>
         <Link to='/books/create'>
            <MdOutlineAddBox size='30' className='test-sky-800 text-4xl' color='blue' />
         </Link> 

      </div>
      {loading ?(<Loading/>) : ShowType === 'table' ? (
        <Card books={books} />
      ) : (
        <Booktable books={books} />
      )}
    </div>
  )
}

export default Home
