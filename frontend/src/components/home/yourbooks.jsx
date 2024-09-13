import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../loading';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdTableChart, MdViewModule } from 'react-icons/md'; 
import Booktable from './booktable';
import Card from './card';
import { useNavigate } from 'react-router-dom';

const Yourbooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    let navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('token');
    
            // If no token is present, redirect to the sign-in page
            if (!token) {
                navigate('/signin');
                return;
            }
    
            setLoading(true);
    
            try {
                const response = await axios.get('http://15.207.54.42:5000/books/fetch', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token'),
                    }
                });
                console.log(response.data);
                const userBooks = response.data; // Adjust as per how user data is structured
                setBooks(userBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBooks();
    }, [navigate]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Your Books</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox size="40" className="text-blue-600 hover:text-blue-800 transition duration-300" />
                </Link>
            </div>


            {loading ? (
                <Loading />
            ) : (
                showType === 'card' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <Card key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <Booktable books={books} />
                )
            )}
        </div>
    );
};

export default Yourbooks;
