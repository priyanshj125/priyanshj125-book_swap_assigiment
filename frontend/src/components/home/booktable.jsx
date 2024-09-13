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

  return (
    <div className="overflow-x-auto p-6 bg-white shadow-lg rounded-lg">
      <table className="min-w-full table-auto border-collapse text-left">
        <thead className="bg-pink-300 text-balck">
          <tr>
            <th className="p-4 border border-black-600 rounded-tl-lg">No</th>
            <th className="p-4 border border-white-600">Title</th>
            <th className="p-4 border border-blue-600">Author</th>
            <th className="p-4 border border-blue-600">Publish Year</th>
            <th className="p-4 border border-blue-600 rounded-tr-lg">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-blue-100 transition duration-300">
              <td className="p-4 border border-slate-300 text-center">{index + 1}</td>
              <td className="p-4 border border-slate-300">{book.title}</td>
              <td className="p-4 border border-slate-300">{book.author}</td>
              <td className="p-4 border border-slate-300 text-center">{book.publishyear}</td>
              <td className="p-4 border border-slate-300">
                <div className="flex justify-center gap-4">
                  <Link to={`/books/details/${book._id}`} className="text-sky-700 hover:text-sky-500">
                    <BsInfoCircle size="25" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className="text-red-500 hover:text-red-300">
                    <AiOutlineEdit size="25" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className="text-pink-400 hover:text-pink-600">
                    <MdOutlineDelete size="25" />
                  </Link>
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
