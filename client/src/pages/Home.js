import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/home.css';

const Home = () => {
  const [showFooter, setShowFooter] = useState(false);

  const handleTodoClick = () => {
    const token = localStorage.getItem('token');
    window.location.href = token ? '/todo' : '/login';
  };

  const handleAboutClick = () => {
    setShowFooter(true);
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onAboutClick={handleAboutClick} />
      <main className="hero">
        <div className="hero-content">
          <h1>
            JustDo <br /><span>Master your schedule.</span>
          </h1>
          <p>Get things done with ease using the world’s favorite task manager.</p>
          <button onClick={handleTodoClick}>➕ Start Planning</button>
        </div>
      </main>
      {showFooter && <Footer />}
    </>
  );
};

export default Home;
