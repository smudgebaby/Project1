import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
