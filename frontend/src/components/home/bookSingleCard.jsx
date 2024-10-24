
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { PiBookOpenTextLight } from 'react-icons/pi';
// import { BiUserCircle, BiShow } from 'react-icons/bi';
// import { BsInfoCircle } from 'react-icons/bs';
// import { AiOutlineMail } from 'react-icons/ai'; // Importing email icon
// import Bookmodal from './bookmodal.jsx';

// const BookSingleCard = ({ book }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [bookImageUrl, setBookImageUrl] = useState(null); // For storing the fetched image URL
//   const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmQs8xbIseku59onHMpZ6bQ3XaeaSjeLgzMQ&s'; // Default image

//   // Fetch book image from Google Books API based on book title
//  // Fetch book image from Google Books API based on book title
// const fetchBookImage = async (title) => {
//   try {
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`);
//     const data = await response.json();
//     const bookData = data.items ? data.items[0] : null;

//     // Prioritize higher-resolution images if available
//     if (bookData && bookData.volumeInfo && bookData.volumeInfo.imageLinks) {
//       const { imageLinks } = bookData.volumeInfo;
//       const highResImage = imageLinks.extraLarge || imageLinks.large || imageLinks.medium || imageLinks.thumbnail;
//       setBookImageUrl(highResImage); // Set the highest available resolution
//     } else {
//       setBookImageUrl(defaultImageUrl); // Use default image if no image is found
//     }
//   } catch (error) {
//     console.error('Error fetching book image:', error);
//     setBookImageUrl(defaultImageUrl); // Use default image in case of an error
//   }
// };


//   // Use effect to fetch the image when the component mounts or the book title changes
//   useEffect(() => {
//     if (book.title) {
//       fetchBookImage(book.title);
//     }
//   }, [book.title]);

//   return (
//     <div className='border-2 border-gray-500 rounded-lg m-4 overflow-hidden hover:shadow-xl'>
//       {/* Book Image */}
//       <div className='relative'>
//         <img
//           src={bookImageUrl || defaultImageUrl} // Use the fetched image or default image
//           alt={book.title}
//           className='w-full h-40 object-cover'
//         />
//         <h2 className='absolute top-2 right-2 px-4 py-1 bg-red-300 rounded-lg text-white'>
//           {book.publishyear}
//         </h2>
//       </div>

//       {/* Book Details */}
//       <div className='p-4'>
//         <h4 className='my-2 text-gray-500'>Swap Now</h4>
//         <div className='flex justify-start items-center gap-x-2'>
//           <PiBookOpenTextLight className='text-red-300 text-2xl' />
//           <h2 className='my-1'>{book.title}</h2>
//         </div>
//         <div className='flex justify-start items-center gap-x-2'>
//           <BiUserCircle className='text-red-300 text-2xl' />
//           <h2 className='my-1'>{book.author}</h2>
//         </div>
//         <div className='flex justify-between items-center gap-x-2 mt-4'>
//           <BiShow
//             className='text-3xl text-blue-800 hover:text-black cursor-pointer'
//             onClick={() => setShowModal(true)}
//           />
//           <Link to={`/books/details/${book._id}`}>
//             <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
//           </Link>
//           {/* Email Icon */}
//           <a href={`mailto:${book.yemail}`}>
//             <AiOutlineMail className='text-2xl text-blue-600 hover:text-black cursor-pointer' />
//           </a>
//         </div>
//         {showModal && (
//           <Bookmodal book={book} onClose={() => setShowModal(false)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookSingleCard;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate to handle navigation
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { IoChatboxEllipses } from "react-icons/io5";
import { AiOutlineMail } from 'react-icons/ai'; 
import Bookmodal from './bookmodal.jsx';
import axios from 'axios'; // Import axios for API requests

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [bookImageUrl, setBookImageUrl] = useState(null);
  const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmQs8xbIseku59onHMpZ6bQ3XaeaSjeLgzMQ&s';
  const navigate = useNavigate(); // Hook for navigation

  // Fetch book image from Google Books API based on book title
  const fetchBookImage = async (title) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`);
      const data = await response.json();
      const bookData = data.items ? data.items[0] : null;

      if (bookData && bookData.volumeInfo && bookData.volumeInfo.imageLinks) {
        const { imageLinks } = bookData.volumeInfo;
        const highResImage = imageLinks.extraLarge || imageLinks.large || imageLinks.medium || imageLinks.thumbnail;
        setBookImageUrl(highResImage);
      } else {
        setBookImageUrl(defaultImageUrl);
      }
    } catch (error) {
      console.error('Error fetching book image:', error);
      setBookImageUrl(defaultImageUrl);
    }
  };

  // Use effect to fetch the image when the component mounts or the book title changes
  useEffect(() => {
    if (book.title) {
      fetchBookImage(book.title);
    }
  }, [book.title]);

  // Function to handle chat button click
  const handleChatClick = async () => {
    try {
      // Check if a chat already exists
      
   
    } catch (error) {
      console.error('Error handling chat click:', error);
    }
  };

  return (
    <div className='border-2 border-gray-500 rounded-lg m-4 overflow-hidden hover:shadow-xl'>
      {/* Book Image */}
      <div className='relative'>
        <img
          src={bookImageUrl || defaultImageUrl} 
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
          <a href={`mailto:${book.yemail}`}>
            <AiOutlineMail className='text-2xl text-blue-600 hover:text-black cursor-pointer' />
          </a>
        <IoChatboxEllipses
            onClick={handleChatClick}
            className='text-2xl text-pink-300 hover:text-black'
        >
          Chat about this book
        </IoChatboxEllipses >
        </div>

        {/* Chat Button */}

        {showModal && (
          <Bookmodal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default BookSingleCard;

