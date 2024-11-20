import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Moon, Sun, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userSlice';
import { useGetCartQuery } from '../slices/cartSlice';

const Header = () => {

  // hamburger menu bar
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // darkmode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  // redux
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const { data: cart, refetch: refetchCart } = useGetCartQuery(undefined, {
    skip: !userInfo,
  });

  useEffect(() => {
    if (userInfo) {
      refetchCart();
    }
  }, [userInfo, refetchCart]);

  // logout func
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success('Successfully logged out.');
      navigate('/login');
      setIsMenuOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Logout failed. Please try again.');
    }
  };

  // darkMode func
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };


  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed z-20 w-full">
      <div className="px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">

          <div className="flex w-full md:w-auto justify-between items-center mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Our Ecom
            </Link>
            {userInfo && (
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-600 dark:text-gray-300"aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>

          <div className={`w-full md:w-auto ${userInfo ? (isMobileMenuOpen ? 'flex' : 'hidden md:flex') : 'flex'} flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4`}>
            <div className="relative w-full md:w-auto">
              <input type="text" placeholder="Search products" name="search" className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"aria-label="Search products"/>
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button>
              {userInfo ? (
                <>
                  <Link to="/cart" className="relative" aria-label="Shopping cart">
                    <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    {cart?.cartItems?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.cartItems.length}
                      </span>
                    )}
                  </Link>
                  <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"aria-haspopup="true"aria-expanded={isMenuOpen}>
                      <User className="h-6 w-6" aria-hidden="true" />
                      <span>{userInfo.name}</span>
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"onClick={closeMenu}>
                          Profile
                        </Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link to="/login" className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 text-center">
                  Sign In
                </Link>
              )}
            </div>

          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;