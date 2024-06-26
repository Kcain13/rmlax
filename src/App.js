import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="background"></div>
      <div className="content">
        <Home />
        <About />
        <Services />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;