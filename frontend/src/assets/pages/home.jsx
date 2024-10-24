// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loading from '../../components/loading';
// import { Link } from 'react-router-dom';
// import { MdOutlineAddBox } from 'react-icons/md'; 
// import Booktable from '../../components/home/booktable';
// import Card from '../../components/home/card';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showType, setShowType] = useState('table'); 


//   let navigate = useNavigate();
   
//   useEffect(() => {
//     if (!localStorage.getItem('token') || localStorage.getItem('token')==undefined) {
//       navigate('/login');
//     }
//   }, [navigate]);



//   useEffect(() => {
//     setLoading(true);
//     axios.get('http://localhost:5000/books')
//       .then((response) => { 
//         setLoading(false);
//         setBooks(response.data.data); 
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className='bg-gray-50 min-h-screen p-6'>
//       <div className='container mx-auto'>
//         <div className='flex justify-between items-center mb-8'>
//           <h1 className='text-4xl font-extrabold text-gray-800'>All Books List</h1>
//           <Link to='/books/create' className='bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition'>
//             <MdOutlineAddBox size='30' />
//           </Link>
//         </div>
//         {loading ? (
//           <Loading />
//         ) : showType === 'table' ? (
//           <Card books={books} />
//         ) : (
//           <Booktable books={books} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/loading';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md'; 
import Booktable from '../../components/home/booktable';
import Card from '../../components/home/card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  let navigate = useNavigate();
   
  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === undefined) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/books')
      .then((response) => { 
        setLoading(false);
        setBooks(response.data.data); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // Normalize search input
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery) || // Search by title
      book.author.toLowerCase().includes(searchQuery) || // Search by author
      String(book.publishyear).includes(searchQuery) // Search by publish year
    );
  });

  return (
    <div className='bg-gray-50 min-h-screen p-6'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-extrabold text-gray-800'>All Books List</h1>
          <Link to='/books/create' className='bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition'>
            <MdOutlineAddBox size='30' />
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className='mb-6'>
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder='Search by title, author, or publish year'
            className='w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>

        {loading ? (
          <Loading />
        ) : showType === 'table' ? (
          <Card books={filteredBooks} /> 
        ) : (
          <Booktable books={filteredBooks} /> 
        )}
      </div>
    </div>
  );
};

export default Home;

