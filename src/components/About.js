import React, { useState } from 'react';
// import './About.css';

const images = [
    // Add your images here
    './aboutus.png',
    './aboutus2.png',
    './aboutus6.jpg',
    './aboutus5.jpeg',
    './aboutus3.png',
    './aboutus4.png',
    './burst4.png',
];

const About = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <section id="about" className="about-section">
            <div className="about-content">
                <div className="about-text">
                    <h1>About Us</h1>
                    <p>ReadyMade Lacrosse was founded by Kevin Cain in 2024</p>
                    <p>Kevin has 20+ Years of Goalie Experience</p>
                    <p>2013 NCAA-DIII National Champion</p>
                    <p>Stevenson University Men's Lacrosse 2011-2015</p>
                    <p>Career High 14 saves against Roanoke University</p>
                    <p>Tallied 167 saves Senior Year at Rocky Point High School</p>
                </div>
                <div className="slideshow-container">
                    <img src={images[currentImageIndex]} alt="About" className="slideshow-image" />
                </div>
            </div>
        </section>
    );
};

export default About;