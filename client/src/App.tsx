import React from 'react'; 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import DashBoard from './components/DashBoard/DashBoard';
import TaskList from './components/TaskList/TaskList';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/tasklist' element={<TaskList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
