import React, { useContext ,useEffect , useState} from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider'; 
import { MdOutlineShoppingCart } from "react-icons/md";
import '../../Style/product.css'
import { FaUserCircle } from "react-icons/fa";
import { fetchCartItems } from '../../services/api';
import Logo from '../../img/logo.png'


const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
 
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const userId = user.user_id;
      const cartItems =await fetchCartItems(userId) || [];
      const totalQuantity = cartItems.data.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalQuantity);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };


  const location = useLocation();
  const { token, logoutUser, role } = useContext(AuthContext) ?? {};

  
  const showLogout = location.pathname !== '/' && token;
  const showUserlogo = location.pathname !=='/' && token;
  const showUsername = location.pathname !=='/' && token;
  const showRegister = location.pathname === '/';
  const showLogin = location.pathname === '/register';
  const showCart = location.pathname !== '/' && role === 'User';
  const userdetail = localStorage.getItem('userDetails');
  const  Showhistory = localStorage.pathname !== '/' && role === 'User';
 

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <a href='/home' className="navbar-brand"> <img src={Logo} alt="Logo" className='logo'  /></a>
        {Showhistory && <Link to="/Order_history" className='Orderhst'><button className='btn btn-light'>Orderhistory</button></Link>}
        {showUserlogo &&(<div className='Userposition'><FaUserCircle /></div>)}&nbsp;
        {showUsername && (<div className='username'>{JSON.parse(userdetail).username}</div>)}
        {showLogout && (
          <button onClick={handleLogout} className="btn btn-danger ms-auto">
            Logout
          </button>
        )}
        {showRegister && (
          <Link to="/register" className="btn btn-primary">Register</Link>
        )}
        {showLogin && (
          <Link to="/" className="btn btn-primary">Login</Link>
        )}
        {showCart && (
          <Link to="/cart" className="btn btn-primary position-relative">
            <MdOutlineShoppingCart size={24} />({cartCount})
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

