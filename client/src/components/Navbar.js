import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Navbar = ({ onAboutClick }) => {
  const navigate = useNavigate();

  const handleTodoClick = () => {
    const token = localStorage.getItem('token');
    navigate(token ? '/todo' : '/login');
  };

  return (
    <header className="navbar">
      <div className="logo-section" onClick={() => navigate('/')}>
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <button className="navbar-logo-button"><strong>JustDo</strong></button>
      </div>
      <nav className="nav-links">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={onAboutClick}>About</button>
        <button onClick={handleTodoClick}>Todo</button>
      </nav>
      <div className="auth-buttons">
        <button onClick={() => navigate('/signup')}>Sign Up</button>
        <button onClick={() => navigate('/login')}>Sign In</button>
      </div>
    </header>
  );
};

export default Navbar;
