import React from 'react';
import '../styles/home.css';

const Footer = () => {
  return (
    <footer id="footer">
      <p>&copy; {new Date().getFullYear()} JustDo — Stay organized, stay ahead.</p>
      <p>
        Toll-Free: <a href="tel:18001234567">1800-123-4567</a> | 
        Contact: <a href="mailto:support@justdoapp.com">support@justdoapp.com</a>
      </p>
    </footer>
  );
};

export default Footer;
