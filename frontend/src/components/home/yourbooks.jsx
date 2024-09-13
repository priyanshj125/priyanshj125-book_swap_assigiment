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
                const userBooks = response.data; 
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
        <div className="relative p-6 min-h-screen  bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/old-books-arrangement-with-copy-space_23-2148898331.jpg?size=626&ext=jpg&ga=GA1.1.361949117.1723757578&semt=ais_hybrid")' }}>
            <div className="absolute inset-0 bg-white opacity-100"></div>
            <div className="relative z-10 p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-black">Your Books</h1>
                    <Link to="/books/create">
                        <MdOutlineAddBox size="40" className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-110" />
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
        </div>
    );
};

export default Yourbooks;
