import React, {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import ProductDetails from './components/Products/ProductDetails/ProductDetails';
import LandingPage from './components/LandingPage/LandingPage'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth';
import AddProduct from './components/Products/Product/AddProduct/AddProduct';
import Home from './components/Products/Home/Home';
import Cart from './components/Cart/Cart';
import PaymentSuccess from './components/Payment/PaymentSuccess'
import PaymentFailed from './components/Payment/PaymentFailed'

import { useDispatch } from 'react-redux';
import { getCartItems } from './actions/cart';
import ProductsCategory from './components/Products/Product/ProductsCategory/ProductsCategory';

const App = () => {

  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [])

  return (
    <div>
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/aone" />} />
          <Route path="/aone" exact element={<LandingPage />} />
          <Route path="/aone/auth" exact element={(!user ? <Auth /> : <Navigate to="/aone" />)} />
          <Route path="/aone/products" exact element={<Home setCurrentId={setCurrentId} />} />

          <Route path="/aone/items" exact element={<Cart setCurrentId={setCurrentId} />} /> 
          <Route path='/aone/products/category' exact element={<ProductsCategory setCurrentId={setCurrentId} />} />
          <Route path="/aone/add-product" exact element={<AddProduct setCurrentId={setCurrentId} currentId={currentId} />} />
          <Route path='/aone/products/search' exact element={<Home setCurrentId={setCurrentId} />} />
          <Route path='/aone/products/:id' element={<ProductDetails />} />


          <Route path='/payment-success' exact element={<PaymentSuccess />} />
          <Route path='/payment-failed' exact element={<PaymentFailed />} />
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App