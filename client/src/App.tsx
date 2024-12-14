import React, { ReactNode } from 'react'; 
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import DashBoard from './components/DashBoard/DashBoard';
import TaskList from './components/TaskList/TaskList';
import Auth from './components/Auth/Auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const App: React.FC = () => {
  const ProtectedRoute = ({children} : ProtectedRouteProps) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/dashboard' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path='/tasklist' element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
