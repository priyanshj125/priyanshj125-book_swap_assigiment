import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/home';
import CreateBook from './assets/pages/createbook';
import ShowBook from './assets/pages/ShowBook.jsx';
import EditBook from './assets/pages/editBook.jsx';
import Deletebook from './assets/pages/deletebook.jsx';
import Navbar from './components/navbar.jsx';
import Login from './components/login.jsx';

const App = () => {
  return (
    <>
      {/* Place Navbar outside of Routes */}
      <Navbar />

      {/* Define your routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path='/books/create' element={<CreateBook />} />
        <Route exact path='/books/details/:id' element={<ShowBook />} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/yourbooks' element={<Home/>} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<Deletebook />} />
      </Routes>
    </>
  );
}

export default App;
