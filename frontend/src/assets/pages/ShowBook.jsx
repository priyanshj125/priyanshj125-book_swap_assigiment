import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ButtonBlack from '../../components/ButtonBlack';
import Loading from '../../components/loading';
import { useNavigate } from 'react-router-dom';

const ShowBook = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token')==undefined) {
      navigate('/login');
    }
  }, [navigate]);
  const [book, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen">
      <ButtonBlack />
      <h1 className="text-4xl font-bold my-6 text-center">Book Details</h1>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-4 border-2 border-blue-300 shadow-lg rounded-xl w-full max-w-lg p-6 bg-white">
          <div className="my-4">
            <span className="text-lg font-semibold text-gray-600">ID:</span>
            <span className="ml-4 text-gray-800">{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-lg font-semibold text-gray-600">Title:</span>
            <span className="ml-4 text-gray-800">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-lg font-semibold text-gray-600">Author:</span>
            <span className="ml-4 text-gray-800">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-lg font-semibold text-gray-600">Published Year:</span>
            <span className="ml-4 text-gray-800">{book.publishyear}</span>
          </div>
          <div className="my-4">
            <span className="text-lg font-semibold text-gray-600">Created At:</span>
            <span className="ml-4 text-gray-800">{new Date(book.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="my-4">
            <span className="text-lg font-semibold text-gray-600">Last Update:</span>
            <span className="ml-4 text-gray-800">{new Date(book.updatedAt).toLocaleDateString()}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
