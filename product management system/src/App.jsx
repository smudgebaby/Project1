import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Products from './Pages/Products/Products.jsx';
import CreateProduct from './Pages/CreateProduct/CreateProduct.jsx';
import ProductDetail from './Pages/ProductDetail/ProductDetail.jsx';
import Cart from './Components/CartDetail.jsx';
import {Container} from '@mui/material';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);
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
          <Route path='/create' element={<CreateProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='/detail' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart open={isCartOpen} handleClose={handleCartClose} cartItems={cartItems} />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
)
}

export default App
