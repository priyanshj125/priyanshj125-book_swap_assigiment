import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Booktable = ({ books }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      // Handle delete functionality here
      console.log(`Book with ID ${id} will be deleted.`);
    }
  };

  return (
    <div className="overflow-x-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <table className="min-w-full table-auto border-collapse text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-4 border-b border-gray-600">No</th>
            <th className="p-4 border-b border-gray-600">Title</th>
            <th className="p-4 border-b border-gray-600">Author</th>
            <th className="p-4 border-b border-gray-600">Publish Year</th>
            <th className="p-4 border-b border-gray-600">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="hover:bg-gray-200 transition duration-300"
            >
              <td className="p-4 border-b border-gray-300 text-center">{index + 1}</td>
              <td className="p-4 border-b border-gray-300">{book.title}</td>
              <td className="p-4 border-b border-gray-300">{book.author}</td>
              <td className="p-4 border-b border-gray-300 text-center">{book.publishyear}</td>
              <td className="p-4 border-b border-gray-300">
                <div className="flex justify-center gap-4">
                  <Link to={`/books/details/${book._id}`} className="text-blue-600 hover:text-blue-400" title="View Details">
                    <BsInfoCircle size="20" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className="text-yellow-500 hover:text-yellow-300" title="Edit Book">
                    <AiOutlineEdit size="20" />
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:text-red-400"
                    title="Delete Book"
                  >
                    <MdOutlineDelete size="20" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booktable;
