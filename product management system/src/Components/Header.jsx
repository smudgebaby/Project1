import './Header.css';
import SearchBox from './SearchBox.jsx';
import {SvgIcon} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser} from '../Store/User/userSelector.js';
import {Link} from 'react-router-dom';
import {
  selectCartTotal,
  selectIsCartOpen,
} from '../Store/Cart/cartSelector.js';
import CartDetail from './CartDetail';
import {setIsCartOpen} from '../Store/Cart/cartAction.js';
import {useState} from 'react';
import {userSlice} from '../Store/userSlice.js';

function Header() {
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

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartTotal = useSelector(selectCartTotal);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <header>
      <div className='header-content'>
        <Link to='/' className='header-link'><h1>M<span>anagement </span><span>Chuwa</span></h1></Link>
        <SearchBox className='search-box' />
        <div className='menu-content'>
          <div className='menu-item'>
            <SvgIcon>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.625 28.125H18.75V23.4375C18.7485 22.1948 18.2542 21.0033 17.3754 20.1246C16.4967 19.2458 15.3052 18.7515 14.0625 18.75H8.4375C7.19475 18.7515 6.00334 19.2458 5.12458 20.1246C4.24583 21.0033 3.75149 22.1948 3.75 23.4375V28.125H1.875V23.4375C1.87699 21.6976 2.56903 20.0296 3.7993 18.7993C5.02958 17.569 6.69763 16.877 8.4375 16.875H14.0625C15.8024 16.877 17.4704 17.569 18.7007 18.7993C19.931 20.0296 20.623 21.6976 20.625 23.4375V28.125Z" fill="white"/>
                <path d="M11.25 3.75C12.1771 3.75 13.0834 4.02492 13.8542 4.53999C14.6251 5.05506 15.2259 5.78714 15.5807 6.64367C15.9355 7.5002 16.0283 8.4427 15.8474 9.35199C15.6666 10.2613 15.2201 11.0965 14.5646 11.7521C13.909 12.4076 13.0738 12.8541 12.1645 13.0349C11.2552 13.2158 10.3127 13.123 9.45618 12.7682C8.59965 12.4134 7.86756 11.8126 7.35249 11.0417C6.83742 10.2709 6.5625 9.3646 6.5625 8.4375C6.5625 7.1943 7.05636 6.00201 7.93544 5.12294C8.81452 4.24386 10.0068 3.75 11.25 3.75ZM11.25 1.875C9.95206 1.875 8.68327 2.25988 7.60407 2.98098C6.52488 3.70208 5.68374 4.727 5.18704 5.92614C4.69034 7.12528 4.56038 8.44478 4.8136 9.71778C5.06682 10.9908 5.69183 12.1601 6.60961 13.0779C7.5274 13.9957 8.69672 14.6207 9.96972 14.8739C11.2427 15.1271 12.5622 14.9972 13.7614 14.5005C14.9605 14.0038 15.9854 13.1626 16.7065 12.0834C17.4276 11.0042 17.8125 9.73544 17.8125 8.4375C17.8125 6.69702 17.1211 5.02782 15.8904 3.79711C14.6597 2.5664 12.9905 1.875 11.25 1.875Z" fill="white"/>
                <path d="M21.75 17.375L23.9802 21.575L28.75 22.1546L25.25 25.3088L25.95 29.975L21.75 27.35L17.55 29.975L18.25 25.3088L14.75 22.1546L19.65 21.575L21.75 17.375Z" fill="#FCE944"/>
              </svg>
            </SvgIcon>
            {currentUser ? (<a onClick={() => {
              dispatch(userSlice.actions.setCurrentUser(null));
            }
            }>Sign Out</a>) : (<Link to='/signin'>Sign In</Link>)}
          </div>
          <div className='menu-item' onClick={toggleIsCartOpen}>
            <SvgIcon>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.375 28.125C10.4105 28.125 11.25 27.2855 11.25 26.25C11.25 25.2145 10.4105 24.375 9.375 24.375C8.33947 24.375 7.5 25.2145 7.5 26.25C7.5 27.2855 8.33947 28.125 9.375 28.125Z" fill="#F9FAFB"/>
                <path d="M22.5 28.125C23.5355 28.125 24.375 27.2855 24.375 26.25C24.375 25.2145 23.5355 24.375 22.5 24.375C21.4645 24.375 20.625 25.2145 20.625 26.25C20.625 27.2855 21.4645 28.125 22.5 28.125Z" fill="#F9FAFB"/>
                <path d="M26.25 6.56245H5.45625L4.6875 2.62495C4.64367 2.41 4.52585 2.21723 4.35455 2.08019C4.18326 1.94315 3.96932 1.87052 3.75 1.87495H0V3.74995H2.98125L6.5625 21.7499C6.60633 21.9649 6.72415 22.1577 6.89545 22.2947C7.06674 22.4317 7.28068 22.5044 7.5 22.4999H24.375V20.6249H8.26875L7.5 16.8749H24.375C24.5917 16.8802 24.8036 16.8103 24.9745 16.6769C25.1454 16.5436 25.2649 16.3552 25.3125 16.1437L27.1875 7.7062C27.2189 7.5671 27.2182 7.42266 27.1854 7.28388C27.1525 7.14511 27.0885 7.01565 26.9981 6.90536C26.9077 6.79507 26.7933 6.70685 26.6637 6.64743C26.534 6.58801 26.3926 6.55894 26.25 6.56245ZM23.625 14.9999H7.14375L5.83125 8.43745H25.0781L23.625 14.9999Z" fill="#F9FAFB"/>
              </svg>
            </SvgIcon>
            <a>${cartTotal}</a>
          </div>
          <CartDetail />
        </div>
      </div>
    </header>
  );
}

export default Header;