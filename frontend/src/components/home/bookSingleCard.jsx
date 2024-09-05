import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai'; // Importing email icon
import Bookmodal from './bookmodal.jsx';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg m-4 overflow-hidden hover:shadow-xl'>
      {/* Book Image */}
      <div className='relative'>
        <img 
          src={book.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmQs8xbIseku59onHMpZ6bQ3XaeaSjeLgzMQ&s'} 
          alt={book.title} 
          className='w-full h-40 object-cover' 
        />
        <h2 className='absolute top-2 right-2 px-4 py-1 bg-red-300 rounded-lg text-white'>
          {book.publishyear}
        </h2>
      </div>

      {/* Book Details */}
      <div className='p-4'>
        <h4 className='my-2 text-gray-500'>Swap Now</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.author}</h2>
        </div>
        <div className='flex justify-between items-center gap-x-2 mt-4'>
          <BiShow
            className='text-3xl text-blue-800 hover:text-black cursor-pointer'
            onClick={() => setShowModal(true)}
          />
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
          </Link>
          {/* Email Icon */}
          <a href={`mailto:${book.yemail}`}>
            <AiOutlineMail className='text-2xl text-blue-600 hover:text-black cursor-pointer' />
          </a>
        </div>
        {showModal && (
          <Bookmodal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default BookSingleCard;
