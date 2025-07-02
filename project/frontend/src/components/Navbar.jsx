import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    setIsLoggedIn(!!userInfo);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-white font-extrabold text-2xl tracking-wide">
              ResolveNow
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75'}`}
              >
                Home
              </Link>
              {!isLoggedIn && (
                <>
                  <Link
                    to="/register"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/register' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75'}`}
                  >
                    Signup
                  </Link>
                  <Link
                    to="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/login' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75'}`}
                  >
                    Login
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/dashboard' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75'}`}
                >
                  Dashboard
                </Link>
              )}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {!isLoggedIn && (
            <>
              <Link
                to="/register"
                className="text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-indigo-100 hover:bg-blue-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 