import React, {useState, useEffect} from 'react'
import './styles.css'
import {Button} from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import MenuIcon from '@material-ui/icons/Menu';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logo} from '../../assets'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  

  const items = useSelector((state) => (state.cart.items.data))
  const totalAmount = useSelector((state) => (state.cart.items.totalAmount))


  const logout = () => {
    dispatch({type: 'LOGOUT'});

    navigate('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // JWT ..

    if(token){
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div className='navbar'>

        <Link to="/" className='brand links'>
            <img className='logo' src={logo} alt="logo" />
            <h2>Aone</h2>
        </Link>

         <div className={isMobile ? 'navbar-main-mobile' : 'navbar-main'}>
            <div className='navbar-content'>
              
                <Link className="links" style={{margin: '20px'}} to='/aone/products'>Products</Link>
                
                {user ? (

                  
                  <Link className='cart-button links' to="/aone/items">
                    <ShoppingCartIcon className='cart-icon' width='50px' />
                    
                    <span className='cart-sum'>{totalAmount}</span>
                  </Link>
                
                
                ) : (
                  null
                )}
            </div>
            

                <div className='navbar-auth'>
                  {user ? (
                    <div className='navbar-loggedIn'>
                    <h4>{user.result.name}</h4>
                    <div>
                      <button
                      className='logout'
                      onClick={logout}
                      >
                        <ExitToAppIcon />
                      </button>
                    </div>
                  </div>                
                  ) : (
                    <Link className="links login-link" to="/aone/auth">Login</Link>
                    )}
              </div>
            
            </div>

        <div className='humbergerMenu-wrapper'>
          <MenuIcon className='humbergerMenu' onClick={() => setIsMobile(!isMobile)} />
        </div>

    </div>
  )
}

export default Navbar