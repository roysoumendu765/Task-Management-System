import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (<>{
    (!isMobile) ? <footer className="bg-gray-800 text-white py-4 text-center">
    <p>&copy; 2024 Task Management System</p>
  </footer> : <></>
  }</>
  );
};

export default Footer;
