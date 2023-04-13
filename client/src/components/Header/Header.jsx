import { Box, Container, createTheme, ThemeProvider } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ReactComponent as ScaleSvg } from './icons/scales-of-justice-svgrepo-com.svg';
import './Header.scss';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  selectorBasket,
  selectorFavorites,
  selectorScales,
  selectorToken,
  selectorUrlAddress,
  selectorUserData
} from '../../selectors';
import { useSelector, useDispatch } from 'react-redux';
import InputSearch from '../InputSearch';
import Authorization from "../../pages/Authorization";
import {actionFetchAuthorizationUser, actionCheckCart, getProductsCart, actionCheckFavorites, getProductsFavorites} from "../../reducers";
import setAuthToken from "../../helpers/setAuthToken";


const Header = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);
  const basket = useSelector(selectorBasket);
  const userData = useSelector(selectorUserData);
  const favorites = useSelector(selectorFavorites);
  const scales = useSelector(selectorScales);
  const authToken = useSelector(selectorToken);
  const urlAddress = useSelector(selectorUrlAddress) || "perPage=6&startPage=1";
  const countInBasket = basket.reduce((acc, {cartQuantity}) => acc + cartQuantity, 0);

  useEffect(() => {
    document.addEventListener('mousedown', handleBurgerMenu);
    return () => {
      document.removeEventListener('mousedown', handleBurgerMenu);
    };
  },);

  useEffect(() => {
    setAuthToken(authToken);
    if (authToken) {
      dispatch(actionFetchAuthorizationUser());
      dispatch(actionCheckCart());
      dispatch(getProductsCart());
      dispatch(actionCheckFavorites());
      dispatch(getProductsFavorites())
    }
  }, [authToken]);

  const burgerMenuRef = useRef();

  const handleBurgerMenu = (event) => {
    if (burgerMenuRef && !burgerMenuRef.current.contains(event.target) && isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const toggleModalAuth = (event) => {
    event.preventDefault();
    setIsModalAuthOpen(!isModalAuthOpen);
}

const closeModalAuth = () => {
    setIsModalAuthOpen(false);
}

  return (
    <>
      <header className="header">
          <Container maxWidth="xl">
            <Box className="header__wrapper">
              <Box className="header__logo-wrapper">
                <Link to="/" className="logo">
                  {window.innerWidth > 1180 ? 'BestLaptops' : 'BL'}
                  <span className="colored">24</span>
                </Link>
              </Box>


              <nav className={isMenuOpen ? 'header__menu header__menu--active' : 'header__menu'} ref={burgerMenuRef}>
                <Box className="menu-list" onClick={() => { setIsMenuOpen(false) }}>
                  <NavLink
                    to={`/products?${urlAddress}`}
                    className="menu-list__item"
                    activeclassname="menu-list__item active-item"
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="menu-list__item"
                    activeclassname="menu-list__item active-item"
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/rules"
                    className="menu-list__item"
                    activeclassname="menu-list__item active-item"
                  >
                    Rules
                  </NavLink>
                  <NavLink
                    to="/why-us"
                    className="menu-list__item"
                    activeclassname="menu-list__item active-item"
                  >
                    Why us
                  </NavLink>
                  <NavLink
                    to="/contacts"
                    className="menu-list__item"
                    activeclassname="menu-list__item active-item"
                  >
                    Contacts
                  </NavLink>
                </Box>
              </nav>
              <Box className="header__input-wrapper">
                <InputSearch style="header__input" />
              </Box>
              <Box className="header__items-actions">
                <Box className="action">
                  <div className="count">
                    <span>{favorites.length}</span>
                  </div>
                  <Link to="/favorites" className="action__icon icon-favorite">
                    <StarBorderIcon />
                  </Link>
                </Box>
                <Box className="action">
                  <div className="count">
                    <span>{scales.length}</span>
                  </div>
                  <Link to="/comparison" className="action__icon icon-compare">
                    <ScaleSvg />
                  </Link>
                </Box>
                <Box className="action ">
                  <div className="count count-cart">
                    <span>{countInBasket}</span>
                  </div>
                  <Link to="/basket" className="action__icon icon-cart">
                    <ShoppingCartOutlinedIcon />
                  </Link>
                </Box>
              </Box>

              <Box className="header__user-actions">
                <Box className="action">
                  { authToken ? (
                      <Link to="/personal-office" className="action__icon" >
                        <span className="user-name">
                          {userData.firstName && userData.firstName[0]}
                        </span>
                      </Link>)
                      : (
                      <button className="action__icon icon-user" onClick={(event) => toggleModalAuth(event)}>
                        <Person2OutlinedIcon />
                      </button>)
                  }
                </Box>
              </Box>

              <Box className="burger-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
              </Box>
            </Box>
            {isModalAuthOpen && <Authorization closeModalAuth={() => closeModalAuth()} />}
          </Container>
      </header>
    </>
  );
};

export default Header;
