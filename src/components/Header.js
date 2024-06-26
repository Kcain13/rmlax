import React from 'react';
import './Header.css';

const Header = () => (
    <header className="header">
        <div className="header-image-container">

            <nav className="nav-menu">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    </header>
);

export default Header;