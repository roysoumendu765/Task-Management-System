import React, { useEffect } from 'react';
import './Header.css';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [activeDashBoard, setActiveDashBoard] = useState<boolean>(true);
  const [activeTaskList, setActiveTaskList] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path === '/') {
      setShowOptions(true);
    }
    if (path === '/tasklist') {
      setActiveDashBoard(false);
      setActiveTaskList(true);
      setShowOptions(false);
    }
    if (path === '/dashboard') {
      setActiveDashBoard(true);
      setActiveTaskList(false);
      setShowOptions(false);
    }
  }, [path]);

  const handleOnLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('useremail');
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <nav className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        {!showOptions ? (
          <>
            <Link to="/dashboard" className="hover:underline">
              <button
                className={`${
                  activeDashBoard ? 'bg-gray-500' : ''
                } hover:bg-gray-600 text-white font-bold py-2 px-4 rounded`}
              >
                DashBoard
              </button>
            </Link>
            <Link to="/tasklist" className="hover:underline">
              <button
                className={`${
                  activeTaskList ? 'bg-gray-500' : ''
                } bg-white-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded`}
              >
                Tasklist
              </button>
            </Link>
          </>
        ) : null}
      </nav>

      {!showOptions ? (
        <button
          onClick={handleOnLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 sm:mt-0"
        >
          Sign Out
        </button>
      ) : null}
    </header>
  );
};

export default Header;
