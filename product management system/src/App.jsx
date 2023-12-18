import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Products from './Pages/Products/Products.jsx';
import CreateProduct from './Pages/CreateProduct/CreateProduct.jsx';
function App() {

  return (
    <Router>
      <Header />
      <Container maxWidth="lg" sx={{height: '88vh', minHeight: 900, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/create' element={<CreateProduct />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
)
}

import {Container} from '@mui/material';

export default App
