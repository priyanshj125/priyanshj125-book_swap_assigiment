import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookSingleCard from './bookSingleCard';
import { useNavigate} from'react-router-dom';



const Card = ({books}) => {
  let navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("token")) {
      // fetchalldata();
    }
    else {
      navigate("/login");     
    }

  },[])
  
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  )
}

export default Card
