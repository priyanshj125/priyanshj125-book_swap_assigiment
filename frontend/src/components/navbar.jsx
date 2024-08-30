import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin'); // Redirect to sign-in page after logout
  };

  const token = localStorage.getItem('token');

  return (
    <div>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/home">Home</Link></li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><Link className="text-sm text-gray-400" to="#">About Us</Link></li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/yourbooks">YourBooks</Link></li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/pricing">Pricing</Link></li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/contact">Contact</Link></li>
        </ul>
        {!token ? (
          <>
            <Link className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200" to="/login">Sign In</Link>
            <Link className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" to="/signup">Sign up</Link>
          </>
        ) : (
          <button className="hidden lg:inline-block py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white font-bold rounded-xl transition duration-200" onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
      </div>
    </div>
  )
}

export default Navbar
