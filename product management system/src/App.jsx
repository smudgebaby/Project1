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
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser} from './Store/User/userAction.js';
import {selectCurrentUser} from './Store/User/userSelector.js';

function App() {


  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const [products, setProducts] = useState([]);
  const [searchInfo, setSearchInfo] = useState('*');

  useEffect(() => {
    let isSubscribed = true;

    const checkStatus = () => {
      try {
        if (isSubscribed) {
          dispatch(setCurrentUser(user));
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkStatus();

    return () => {
      isSubscribed = false;
    };
  }, [dispatch]);



  return (
    <Router>
      <Header setSearchInfo={setSearchInfo}/>
      <Container maxWidth="xl" sx={{minHeight: '88vh', display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/create' element={<CreateProduct />} />
          <Route path="/edit" element={<CreateProduct />} />
          <Route path='/' element={<Products searchInfo={searchInfo} products={products} setProducts={setProducts}/>} />
          <Route path='/detail' element={<ProductDetail />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
)
}

export default App
