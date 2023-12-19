import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx'
import Confirmation from './Pages/Confirmation/Confirmation.jsx'
import Error from './Pages/Error/Error.jsx'
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Products from './Pages/Products/Products.jsx';
import CreateProduct from './Pages/CreateProduct/CreateProduct.jsx';
import ProductDetail from './Pages/ProductDetail/ProductDetail.jsx';
import Cart from './Components/CartDetail.jsx';
import {Container} from '@mui/material';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([
    {
        id: 1,
        name: 'Apple Iphone 11, 128G',
        price: 499,
        imageUrl: '/1.png',
        quantity:0

    },
    {
        id: 2,
        name: 'Apple Iphone 11, 128G',
        price: 499,
        imageUrl: '/2.png',
        quantity:0
    }, 
    {
      id: 3,
      name: 'Apple Iphone 11, 128G',
      price: 499,
      imageUrl: '/3.png',
      quantity:0
    },
    {
      id: 4,
      name: 'Apple Iphone 11, 128G',
      price: 499,
      imageUrl: '/4.png',
      quantity:0
    },

  ]);
  const [isCartOpen, setIsCartOpen] = useState(true);
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <Router>
      <Header />
      <Container maxWidth="xl" sx={{minHeight: '88vh', display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/create' element={<CreateProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='/detail' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart open={isCartOpen} handleClose={handleCartClose} cartItems={cartItems} setCartItems={setCartItems}/>} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
)
}

export default App
