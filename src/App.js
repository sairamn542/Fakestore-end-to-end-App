import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FakestoreApi from './Components/Fakestore/Fakestore';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Cart from './Components/Fakestore/Cart';

function App() {
  // Define your addToCart function here
  const addToCart = (product) => {
    // Implementation of addToCart function
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        {/* Make sure addToCart is defined before passing it as a prop */}
        <Route path='/fakestore' element={<FakestoreApi addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
