import React from 'react';
import { useNavigate } from 'react-router-dom';
const Chats = () => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2620/2620948.png" 
            alt="Coming Soon" 
            className="w-32 h-32 mb-6" 
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Chats Feature Coming Soon!</h1>
        <p className="text-lg text-gray-600 mb-4">We are working hard to bring you the best chat experience. Stay tuned for updates!</p>
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={() => navigate('/')} // Navigate to home page on click
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default Chats;
