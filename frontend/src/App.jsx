import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/home';
import CreateBook from './assets/pages/createbook';
import ShowBook from './assets/pages/ShowBook.jsx';
import EditBook from './assets/pages/editBook.jsx';
import Deletebook from './assets/pages/deletebook.jsx';
import Navbar from './components/navbar.jsx';
import Login from './components/login.jsx';
import Card from './components/home/card.jsx';
import Yourbooks from './components/home/yourbooks.jsx';
import Signup from './components/signup.jsx';
import About from './assets/pages/about.jsx';
import Contact from './assets/pages/contact.jsx';
import Pricing from './assets/pages/pricing.jsx';
import Chats from './assets/pages/chats.jsx';

const App = () => {
  const showalert = (message, type) => {
    // Logic to show an alert message
    console.log(`${type}: ${message}`);
  };
  
  // Render the Signup component with showalert prop
  <Signup showalert={showalert} />
  
  return (
    <>
      {/* Place Navbar outside of Routes */}
      <Navbar />

      {/* Define your routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path='/books/create' element={<CreateBook />} />
        <Route exact path='/books/details/:id' element={<ShowBook />} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/yourbooks' element={<Yourbooks/>} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<Deletebook />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/pricing' element={<Pricing/>} />
        <Route path='/chats' element={<Chats/>} />
      </Routes>
    </>

  );
}

export default App;
