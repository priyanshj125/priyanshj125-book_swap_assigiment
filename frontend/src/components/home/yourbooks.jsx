import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../loading';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md'; 
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
                        "Authorization":localStorage.getItem('token')
                    }
                });
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
                console.log(response.data);
                // Filter books to show only those added by the logged-in user
                const userBooks = response.data; // Adjust the filtering based on how you store user ID
                setBooks(userBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
                // Handle error, perhaps by showing a message to the user
            } finally {
                setLoading(false);
            }
        };
    
        fetchBooks();
    }, [navigate]);

    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4 mb-4'>
               
            </div>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-3xl my-8'>Your Books</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox size='30' className='text-sky-800 text-4xl' color='blue' />
                </Link>
            </div>
            {loading ? (
                <Loading />
            ) : showType === 'card' ? (
                <Card />
            ) : (
                <Booktable books={books} />
            )}
        </div>
    );
}

export default Yourbooks;
