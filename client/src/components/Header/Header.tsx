import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <nav className="flex space-x-6">
        <a href="/dashboard" className="hover:underline">
          DashBoard
        </a>
        <a href="/tasklist" className="hover:underline">
          TaskList
        </a>
      </nav>

      <button
        onClick={() => alert('Sign out')}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
